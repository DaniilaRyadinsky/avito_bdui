package github.detrig.uikit.components.universal_lazy_list

import android.util.Log
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import github.detrig.uikit.core.DataBinder
import github.detrig.uikit.components.screen.ScreenParser
import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.components.utils.ComponentRenderer
import github.detrig.uikit.components.utils.toComposeModifier
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.core.ActionEvent
import github.detrig.uikit.core.performActionsForEvent
import github.detrig.uikit.states.DataState
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive

object ListRenderer {

    @Composable
    fun Render(
        component: ListComponent,
        state: ScreenState,
        dataState: DataState,
        dispatcher: ActionDispatcher
    ) {
        val items = dataState.getList(component.id ?: "") ?: emptyList()

        LaunchedEffect(component) {
            component.performActionsForEvent(ActionEvent.OnScreenInitialized, dispatcher)
        }

        LazyColumn(
            modifier = component.modifier?.toComposeModifier() ?: Modifier.fillMaxWidth()
        ) {
            items(items.size) { index ->
                val itemData = items[index]

                val templateJson = component.template[0]

                val templateComponent = ScreenParser.json.decodeFromJsonElement(
                    Component.serializer(),
                    templateJson
                )

                val filledTemplate = DataBinder.bindData(templateComponent, itemData)

                ComponentRenderer.Render(filledTemplate, state, dataState, dispatcher)
            }
        }
    }

}