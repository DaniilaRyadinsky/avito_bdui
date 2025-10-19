package github.detrig.uikit.components.box

import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import github.detrig.uikit.components.utils.toComposeModifier
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
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.components.text.TextComponent
import github.detrig.uikit.components.text.TextRenderer
import github.detrig.uikit.components.textfield.TextFieldComponent
import github.detrig.uikit.components.textfield.TextFieldRenderer
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.components.universal_lazy_list.ListComponent
import github.detrig.uikit.components.universal_lazy_list.ListRenderer


object BoxRenderer {

    @Composable
    fun Render(component: BoxComponent, state: ScreenState, dispatcher: ActionDispatcher, modifier: Modifier = Modifier) {
        Box(modifier = component.modifier?.toComposeModifier() ?: Modifier) {
            component.children.forEach { child ->

                val modifierWithAlign = when (child.modifier?.align) {
                    "topCenter" -> modifier.then(Modifier.align(Alignment.TopCenter))
                    "center" -> modifier.then(Modifier.align(Alignment.Center))
                    "centerEnd" -> modifier.then(Modifier.align(Alignment.CenterEnd))
                    else -> modifier
                }

                when (child) {
                    is TextComponent -> TextRenderer.Render(child, dispatcher, state, modifierWithAlign)
                    is ButtonComponent -> ButtonRenderer.Render(child, state, dispatcher, modifierWithAlign)
                    is ImageComponent -> ImageRenderer.Render(child, state, dispatcher, modifierWithAlign)
                    is TextFieldComponent -> TextFieldRenderer.Render(child, state, dispatcher, modifierWithAlign)
                    //is RowComponent -> RowRenderer.Render(child, state, dataState, dispatcher)
                    //is ColumnComponent -> ColumnRenderer.Render(child, state, dispatcher)
                    is CheckboxComponent -> CheckboxRenderer.Render(child, dispatcher, state, modifierWithAlign)
                    //is CardComponent -> CardRenderer.Render(child, state, dataState, dispatcher, modifierWithAlign)
                    is IconComponent -> IconRenderer.Render(child, state, dispatcher)
                    is BoxComponent -> Render(child, state, dispatcher)
                    else -> {}
                }
            }
        }
    }
}