package github.detrig.uikit.core

import android.util.Log
import github.detrig.uikit.components.screen.ScreenState

class ActionDispatcher(
    private val state: ScreenState,
    private val navigate: ((String) -> Unit)? = null
) {
    private val listeners = mutableMapOf<String, (Action) -> Unit>()

    fun register(actionType: String, handler: (Action) -> Unit) {
        listeners[actionType] = handler
    }

    fun dispatch(action: Action) {
        Log.d("alz-04", "action: $action")
        listeners[action.action]?.invoke(action)
    }

    fun registerDefaultActions() {
        register("set_value") { action ->
            state.updateComponent(action.targetId, action.value)
        }

        register("navigate") { action ->
            action.targetId?.let { navigate?.invoke(it) }
        }

        register("showSnackbar") { action ->
            val id = action.targetId ?: return@register
            state.showSnackbar(id)
        }

        register("restoreItem") { action ->
            val id = action.targetId ?: return@register
            println("Восстановить элемент $id")
        }

        register("showBottomSheet") { action ->
            val id = action.targetId ?: return@register
            state.showSheet(id)
        }

        register("hideBottomSheet") { action ->
            val id = action.targetId ?: return@register
            state.hideSheet(id)
        }
    }
}

//        register("increment") { action ->
//            state.incrementCounter(action.targetId ?: return@register)
//        }
//
//        register("decrement") { action ->
//            val current = (state.getValue(action.targetId ?: "") as? Int ?: 0)
//            state.updateComponent(action.targetId, max(0, current - 1))
//        }

//        register("delete") { action ->
//            state.removeComponent(action.targetId ?: return@register)
//        }

//
//    fun registerCartActions() {
//        register("increment") { action ->
//            val id = action.targetId ?: return@register
//            val items = state.getValue("cart_list") as? List<CartItemData> ?: return@register
//            val updated = items.map {
//                if (it.id == id) it.copy(quantity = it.quantity + 1) else it
//            }
//            state.updateComponent("cart_list", updated)
//        }
//
//        register("decrement") { action ->
//            val id = action.targetId ?: return@register
//            val items = state.getValue("cart_list") as? List<CartItemData> ?: return@register
//            val updated = items.map {
//                if (it.id == id) it.copy(quantity = max(0, it.quantity - 1)) else it
//            }
//            state.updateComponent("cart_list", updated)
//        }
//
//        register("toggle_favorite") { action ->
//            val id = action.targetId ?: return@register
//            val items = state.getValue("cart_list") as? List<CartItemData> ?: return@register
//            val updated = items.map {
//                if (it.id == id) it.copy(isFavorite = !it.isFavorite) else it
//            }
//            state.updateComponent("cart_list", updated)
//        }
//
//        register("delete") { action ->
//            val id = action.targetId ?: return@register
//            val items = state.getValue("cart_list") as? List<CartItemData> ?: return@register
//            state.updateComponent("cart_list", items.filterNot { it.id == id })
//        }
//    }

