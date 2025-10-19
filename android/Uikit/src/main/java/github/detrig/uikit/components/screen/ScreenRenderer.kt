package github.detrig.uikit.components.screen

import SnackbarRenderer
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import github.detrig.uikit.components.box.BoxComponent
import github.detrig.uikit.components.checkbox.CheckboxComponent
import github.detrig.uikit.components.button.ButtonComponent
import github.detrig.uikit.components.button.ButtonRenderer
import github.detrig.uikit.components.card.CardComponent
import github.detrig.uikit.components.card.CardRenderer
import github.detrig.uikit.components.checkbox.CheckboxRenderer
import github.detrig.uikit.components.column.ColumnComponent
import github.detrig.uikit.components.column.ColumnRenderer
import github.detrig.uikit.components.icon.IconComponent
import github.detrig.uikit.components.icon.IconRenderer
import github.detrig.uikit.components.image.ImageComponent
import github.detrig.uikit.components.image.ImageRenderer
import github.detrig.uikit.components.row.RowComponent
import github.detrig.uikit.components.row.RowRenderer
import github.detrig.uikit.components.text.TextComponent
import github.detrig.uikit.components.text.TextRenderer
import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.core.ActionDispatcher
import androidx.core.graphics.toColorInt
import github.detrig.uikit.components.bottomsheet.BottomSheetComponent
import github.detrig.uikit.components.bottomsheet.BottomSheetRenderer
import github.detrig.uikit.components.box.BoxRenderer
import github.detrig.uikit.components.snackbar.SnackbarComponent
import github.detrig.uikit.components.textfield.TextFieldComponent
import github.detrig.uikit.components.textfield.TextFieldRenderer
import github.detrig.uikit.components.universal_lazy_list.ListComponent
import github.detrig.uikit.components.universal_lazy_list.ListRenderer
import github.detrig.uikit.core.ActionEvent
import github.detrig.uikit.core.performActionsForEvent
import github.detrig.uikit.states.DataState
import github.detrig.uikit.states.ScreenState

object ScreenRenderer {
    @Composable
    fun Render(component: ScreenComponent, state: ScreenState, dataState: DataState, dispatcher: ActionDispatcher) {
        val backgroundColor = component.background?.let {
            Color(it.toColorInt())
        } ?: Color.White

        LaunchedEffect(component.id) {
            component.performActionsForEvent(ActionEvent.OnScreenInitialized, dispatcher)
        }

        Scaffold(
            topBar = {
                if (component.topBar.isNotEmpty()) {
                    component.topBar.forEach { RenderComponent(it, state, dataState, dispatcher) }
                }
            },
            bottomBar = {
                if (component.bottomBar.isNotEmpty()) {
                    component.bottomBar.forEach { RenderComponent(it, state, dataState, dispatcher) }
                }
            },
            snackbarHost = {
                Column {
                    component.snackbars.forEach { snackbar ->
                        RenderComponent(snackbar, state, dataState, dispatcher)
                    }
                }
            },
            containerColor = backgroundColor
        ) { paddingValues ->
            Column(
                modifier = Modifier
                    .padding(paddingValues)
                    .fillMaxHeight()
                    .fillMaxWidth()
            ) {
                component.content.forEach {
                    RenderComponent(it, state, dataState, dispatcher)
                }
            }
        }
        component.bottomSheets.forEach {
            RenderComponent(it, state, dataState, dispatcher)
        }
    }

}

@Composable
fun RenderComponent(component: Component, state: ScreenState, dataState: DataState, dispatcher: ActionDispatcher) {
    when (component) {
        is TextComponent -> TextRenderer.Render(component, dispatcher, state)
        is ButtonComponent -> ButtonRenderer.Render(component, state, dispatcher)
        is ImageComponent -> ImageRenderer.Render(component, state, dispatcher)
        is TextFieldComponent -> TextFieldRenderer.Render(component, state, dispatcher)
        is IconComponent -> IconRenderer.Render(component, state, dispatcher)
        is CheckboxComponent -> CheckboxRenderer.Render(component, dispatcher, state)
        is RowComponent -> RowRenderer.Render(component, state, dataState, dispatcher)
        is BoxComponent -> BoxRenderer.Render(component, state, dispatcher)
        is ColumnComponent -> ColumnRenderer.Render(component, state, dataState, dispatcher)
        is ListComponent -> ListRenderer.Render(component, state, dataState, dispatcher)
        is CardComponent -> CardRenderer.Render(component, state, dataState, dispatcher)
        is SnackbarComponent -> SnackbarRenderer.Render(component, state, dispatcher)
        is BottomSheetComponent -> {
            BottomSheetRenderer.Render(component, state, dataState, dispatcher)
        }

        else -> {
            println("Unknown component type: ${component::class.simpleName}")
        }
    }
}