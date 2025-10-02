package github.detrig.uikit.components.column

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import github.detrig.uikit.components.box.BoxComponent
import github.detrig.uikit.components.box.BoxRenderer
import github.detrig.uikit.components.checkbox.CheckboxComponent
import github.detrig.uikit.components.button.ButtonComponent
import github.detrig.uikit.components.button.ButtonRenderer
import github.detrig.uikit.components.card.CardComponent
import github.detrig.uikit.components.card.CardRenderer
import github.detrig.uikit.components.checkbox.CheckboxRenderer
import github.detrig.uikit.components.icon.IconComponent
import github.detrig.uikit.components.icon.IconRenderer
import github.detrig.uikit.components.image.ImageComponent
import github.detrig.uikit.components.image.ImageRenderer
import github.detrig.uikit.components.row.RowComponent
import github.detrig.uikit.components.row.RowRenderer
import github.detrig.uikit.components.screen.ScreenState
import github.detrig.uikit.components.spacer.SpacerComponent
import github.detrig.uikit.components.text.TextComponent
import github.detrig.uikit.components.text.TextRenderer
import github.detrig.uikit.components.textfield.TextFieldComponent
import github.detrig.uikit.components.textfield.TextFieldRenderer
import github.detrig.uikit.components.utils.toComposeModifier
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.custom_components.ListComponent
import github.detrig.uikit.custom_components.ListRenderer

object ColumnRenderer {

    @Composable
    fun Render(component: ColumnComponent, state: ScreenState, dispatcher: ActionDispatcher) {
        Column(
            modifier = component.modifier?.toComposeModifier() ?: Modifier,
            verticalArrangement = when (component.verticalArrangement) {
                "top" -> Arrangement.Top
                "center" -> Arrangement.Center
                "bottom" -> Arrangement.Bottom
                "spaceBetween" -> Arrangement.SpaceBetween
                "spaceAround" -> Arrangement.SpaceAround
                "spaceEvenly" -> Arrangement.SpaceEvenly
                else -> Arrangement.Top
            },
            horizontalAlignment = when (component.horizontalAlignment) {
                "start" -> Alignment.Start
                "center" -> Alignment.CenterHorizontally
                "end" -> Alignment.End
                else -> Alignment.Start
            }
        ) {
            component.children.forEach { child ->
                val modifier = child.modifier?.toComposeModifier() ?: Modifier
                val modifierWithAlign = when (child.modifier?.align) {
                    "start" -> modifier.then(Modifier.align(Alignment.Start))
                    "center" -> modifier.then(Modifier.align(Alignment.CenterHorizontally))
                    "end" -> modifier.then(Modifier.align(Alignment.End))
                    else -> modifier
                }

                when (child) {
                    is TextComponent -> TextRenderer.Render(child, state, modifierWithAlign)
                    is ButtonComponent -> ButtonRenderer.Render(child, state, dispatcher, modifierWithAlign)
                    is ImageComponent -> ImageRenderer.Render(child, state, modifierWithAlign)
                    is TextFieldComponent -> TextFieldRenderer.Render(child, state, dispatcher, modifierWithAlign)
                    is RowComponent -> RowRenderer.Render(child, state, dispatcher)
                    is ColumnComponent -> Render(child, state, dispatcher)
                    is CheckboxComponent -> CheckboxRenderer.Render(child, state, modifierWithAlign)
                    is SpacerComponent -> {
                        val baseModifier = child.modifier?.toComposeModifier() ?: Modifier
                        val finalModifier = child.modifier?.weight?.let { w ->
                            baseModifier.then(Modifier.weight(w))
                        } ?: baseModifier
                        Spacer(modifier = finalModifier)
                    }
                    is CardComponent -> CardRenderer.Render(child, state, dispatcher, modifierWithAlign)
                    is BoxComponent -> BoxRenderer.Render(child, state, dispatcher, modifierWithAlign)
                    is IconComponent -> IconRenderer.Render(child, state, dispatcher, modifierWithAlign)
                    is ListComponent -> ListRenderer.Render(child, state, dispatcher, modifierWithAlign)
                    else -> {}
                }
            }
        }
    }
}
