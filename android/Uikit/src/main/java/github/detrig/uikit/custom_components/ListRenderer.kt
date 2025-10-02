package github.detrig.uikit.custom_components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import github.detrig.uikit.components.screen.ScreenState
import github.detrig.uikit.components.utils.ComponentRenderer
import github.detrig.uikit.components.utils.toComposeModifier
import github.detrig.uikit.core.ActionDispatcher

object ListRenderer {
    @Composable
    fun Render(component: ListComponent, state: ScreenState, dispatcher: ActionDispatcher, modifier: Modifier = Modifier) {
        LazyColumn(
            modifier = (component.modifier?.toComposeModifier()) ?: Modifier.fillMaxWidth()
        ) {
            items(component.items) { item ->
                ComponentRenderer.Render(item, state, dispatcher)
            }
        }
    }
}