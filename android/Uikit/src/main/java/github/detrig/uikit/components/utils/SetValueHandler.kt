package github.detrig.uikit.components.utils

import android.util.Log
import github.detrig.uikit.core.Action
import github.detrig.uikit.core.ActionHandler
import github.detrig.uikit.states.ScreenState
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.double
import kotlinx.serialization.json.doubleOrNull

class SetValueHandler(
    private val screenState: ScreenState
) : ActionHandler<Action.SetValue> {

    override fun canHandle(action: Action): Boolean = action is Action.SetValue

    override suspend fun handle(action: Action.SetValue) {
        try {
            val newValue = when {
                action.value is JsonPrimitive && action.value.isString -> action.value.content
                action.value is JsonPrimitive && action.value.booleanOrNull != null -> action.value.boolean
                action.value is JsonPrimitive && action.value.doubleOrNull != null -> action.value.double
                else -> action.value.toString()
            }

            screenState.updateValue(action.targetId, newValue)
        } catch (e: Exception) {
            Log.e("ActionHandler", "Error in SetValueHandler: ${e.message}", e)
        }
    }
}