package github.detrig.uikit.components.bottomsheet

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import github.detrig.uikit.components.screen.ScreenState
import github.detrig.uikit.components.utils.toComposeModifier
import github.detrig.uikit.core.Action
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.components.box.BoxComponent
import github.detrig.uikit.components.box.BoxRenderer
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
import github.detrig.uikit.components.spacer.SpacerComponent
import github.detrig.uikit.components.text.TextComponent
import github.detrig.uikit.components.text.TextRenderer


object BottomSheetRenderer {

    @OptIn(ExperimentalMaterial3Api::class)
    @Composable
    fun Render(component: BottomSheetComponent, state: ScreenState, dispatcher: ActionDispatcher) {
        val sheetState = rememberModalBottomSheetState(
            skipPartiallyExpanded = true
        )

        val sheetVisible = state.isSheetVisible(component.id ?: "")

        if (sheetVisible) {
            ModalBottomSheet(
                onDismissRequest = {
                    if (component.dismissible) {
                        state.hideSheet(component.id ?: "")
                    }
                },
                sheetState = sheetState
            ) {
                Column(
                    modifier = component.modifier?.toComposeModifier() ?: Modifier.fillMaxWidth()
                ) {
                    component.children.forEach { child ->
                        when (child) {
                            is TextComponent -> TextRenderer.Render(child, state)
                            is ButtonComponent -> ButtonRenderer.Render(child, state, dispatcher)
                            is ImageComponent -> ImageRenderer.Render(child, state)
                            is RowComponent -> RowRenderer.Render(child, state, dispatcher)
                            is ColumnComponent -> ColumnRenderer.Render(child, state, dispatcher)
                            is CheckboxComponent -> CheckboxRenderer.Render(child, state)
                            is SpacerComponent -> {
                                val baseModifier = child.modifier?.toComposeModifier() ?: Modifier
                                val finalModifier = child.modifier?.weight?.let { w ->
                                    baseModifier.then(Modifier.weight(w))
                                } ?: baseModifier
                                Spacer(modifier = finalModifier)
                            }

                            is CardComponent -> CardRenderer.Render(child, state, dispatcher)
                            is BoxComponent -> BoxRenderer.Render(child, state, dispatcher)
                            is IconComponent -> IconRenderer.Render(child, state, dispatcher)
                            else -> {}
                        }
                    }
                }
            }
        }
    }
}
