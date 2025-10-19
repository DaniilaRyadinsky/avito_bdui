package github.detrig.uikit.core

import android.util.Log
import github.detrig.uikit.components.utils.Component
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlin.reflect.KClass


class ActionDispatcher {

    private val handlers = mutableMapOf<KClass<out Action>, ActionHandler<out Action>>()

    fun <T : Action> register(type: KClass<T>, handler: ActionHandler<T>) {
        handlers[type] = handler
    }

    @Suppress("UNCHECKED_CAST")
    suspend fun dispatch(action: Action) {
        val handler = handlers[action::class] as? ActionHandler<Action>
        if (handler != null) handler.handle(action)
        else Log.w("ActionDispatcher", "No handler found for ${action::class.simpleName}")
    }
}

fun Component.performActionsForEvent(
    event: ActionEvent,
    dispatcher: ActionDispatcher
) {
    actions
        ?.filter { it.event == event }
        ?.forEach { action ->
            CoroutineScope(Dispatchers.Main).launch {
                dispatcher.dispatch(action)
            }
        }
}


//class ActionDispatcher(
//    private val state: ScreenState,
//    private val navigate: ((String) -> Unit)? = null
//) {
//    private val listeners = mutableMapOf<String, (Action) -> Unit>()
//
//    fun register(actionType: String, handler: (Action) -> Unit) {
//        listeners[actionType] = handler
//    }
//
//    fun dispatch(action: Action) {
//        Log.d("alz-04", "Dispatching type: ${action.type}, targetId: ${action.targetId}")
//        listeners[action.type]?.invoke(action)
//    }
//
//    fun registerDefaultActions() {
//        register("set_value") { action ->
//            state.updateComponent(action.targetId, action.value)
//        }
//
//        register("navigate") { action ->
//            action.targetId?.let { navigate?.invoke(it) }
//        }
//
//        register("showSnackbar") { action ->
//            val id = action.targetId ?: return@register
//            state.showSnackbar(id)
//        }
//
//        register("restoreItem") { action ->
//            val id = action.targetId ?: return@register
//            println("Восстановить элемент $id")
//        }
//
//        register("showBottomSheet") { action ->
//            val id = action.targetId ?: return@register
//            state.showSheet(id)
//        }
//
//        register("hideBottomSheet") { action ->
//            val id = action.targetId ?: return@register
//            state.hideSheet(id)
//        }
//    }
//}
