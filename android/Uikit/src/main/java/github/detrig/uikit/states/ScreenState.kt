package github.detrig.uikit.states

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import github.detrig.uikit.components.bottomsheet.BottomSheetComponent
import github.detrig.uikit.components.box.BoxComponent
import github.detrig.uikit.components.button.ButtonComponent
import github.detrig.uikit.components.card.CardComponent
import github.detrig.uikit.components.checkbox.CheckboxComponent
import github.detrig.uikit.components.column.ColumnComponent
import github.detrig.uikit.components.row.RowComponent
import github.detrig.uikit.components.screen.ScreenComponent
import github.detrig.uikit.components.text.TextComponent
import github.detrig.uikit.components.textfield.TextFieldComponent
import github.detrig.uikit.components.utils.Component
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class ScreenState(screen: ScreenComponent) {

    private val componentStates = mutableStateMapOf<String, Any?>()

    private val visibleSnackbars = mutableStateMapOf<String, Boolean>()
    private val visibleSheets = mutableStateMapOf<String, Boolean>()

    init {
        updateFrom(screen)
    }

    fun updateFrom(screen: ScreenComponent) {
        screen.snackbars.forEach { snackbar ->
            val id = snackbar.id ?: return@forEach
            visibleSnackbars[id] = false
        }

        fun traverse(component: Component) {
            val id = component.id ?: return
            when (component) {
                is TextComponent -> componentStates[id] = mutableStateOf(component.text)
                is CheckboxComponent -> componentStates[id] = mutableStateOf(component.isChecked)
                is ButtonComponent -> componentStates[id] = mutableStateOf(component.enabled)
                is TextFieldComponent -> componentStates[id] = mutableStateOf(component.value ?: "")
            }

            when (component) {
                is RowComponent -> component.children.forEach { traverse(it) }
                is ColumnComponent -> component.children.forEach { traverse(it) }
                is BoxComponent -> component.children.forEach { traverse(it) }
                is CardComponent -> component.children.forEach { traverse(it) }
                is BottomSheetComponent -> component.children.forEach {
                    traverse(it)
                }

//                is ListComponent -> {
//                    val list = mutableStateListOf<Component>()
//                    componentStates[id] = list
//                }
            }
        }

        screen.topBar.forEach { traverse(it) }
        screen.content.forEach { traverse(it) }
        screen.bottomBar.forEach { traverse(it) }
        screen.bottomSheets.forEach { sheet ->
            val id = sheet.id ?: return@forEach
            visibleSheets[id] = false
            traverse(sheet)
        }
    }

    fun getValue(id: String?): Any? = id?.let { componentStates[it] }

    fun updateComponent(id: String?, value: Any?) {
        if (id != null) componentStates[id] = value
    }

    fun getList(id: String?): List<Any>? = id?.let { componentStates[it] as? List<Any> }


    fun showSnackbar(id: String) {
        visibleSnackbars[id] = true
        CoroutineScope(Dispatchers.Main).launch {
            delay(3000)
            visibleSnackbars[id] = false
        }
    }

    fun hideSnackbar(id: String) {
        visibleSnackbars[id] = false
    }

    fun isSnackbarVisible(id: String): Boolean = visibleSnackbars[id] == true

    //Sheet
    fun showSheet(id: String) {
        visibleSheets[id] = true
    }

    fun hideSheet(id: String) {
        visibleSheets[id] = false
    }

    fun isSheetVisible(id: String): Boolean = visibleSheets[id] == true


    fun updateValue(id: String?, newValue: Any?) {
        if (id == null) return
        val state = componentStates[id]
        if (state is MutableState<*>) {
            when (state.value) {
                is String -> (state as MutableState<String>).value = newValue.toString()
                is Boolean -> (state as MutableState<Boolean>).value = newValue.toString().toBooleanStrictOrNull() ?: false
                is Int -> (state as MutableState<Int>).value = newValue.toString().toIntOrNull() ?: 0
                is Double -> (state as MutableState<Double>).value = newValue.toString().toDoubleOrNull() ?: 0.0
                else -> (state as MutableState<Any?>).value = newValue
            }
        } else {
            componentStates[id] = mutableStateOf(newValue)
        }
    }
}