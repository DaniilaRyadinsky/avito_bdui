package github.detrig.uikit.components.card

import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.core.graphics.toColorInt
import github.detrig.uikit.components.box.BoxComponent
import github.detrig.uikit.components.box.BoxRenderer
import github.detrig.uikit.components.utils.toComposeModifier
import github.detrig.uikit.components.checkbox.CheckboxComponent
import github.detrig.uikit.components.button.ButtonComponent
import github.detrig.uikit.components.button.ButtonRenderer
import github.detrig.uikit.components.checkbox.CheckboxRenderer
import github.detrig.uikit.components.column.ColumnComponent
import github.detrig.uikit.components.column.ColumnRenderer
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
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.custom_components.ListComponent
import github.detrig.uikit.custom_components.ListRenderer

object CardRenderer {

    @Composable
    fun Render(component: CardComponent, state: ScreenState, dispatcher: ActionDispatcher, modifier: Modifier = Modifier) {
        val elevation = (component.elevation ?: 0).dp
        val shape = component.shape?.cornerRadius?.let { RoundedCornerShape(it.dp) }
            ?: RoundedCornerShape(0.dp)
        val backgroundColor = component.background?.let { Color(it.toColorInt()) } ?: Color.White

        Card(
            modifier = (component.modifier?.toComposeModifier() ?: Modifier),
            elevation = CardDefaults.cardElevation(defaultElevation = elevation),
            shape = shape,
            colors = CardDefaults.cardColors(containerColor = backgroundColor)
        ) {
            component.children.forEach { child ->
                when (child) {
                    is TextComponent -> TextRenderer.Render(child, state)
                    is ButtonComponent -> ButtonRenderer.Render(child, state, dispatcher)
                    is ImageComponent -> ImageRenderer.Render(child, state)
                    is TextFieldComponent -> TextFieldRenderer.Render(child, state, dispatcher)
                    is RowComponent -> RowRenderer.Render(child, state, dispatcher)
                    is ColumnComponent -> ColumnRenderer.Render(child, state, dispatcher)
                    is CheckboxComponent -> CheckboxRenderer.Render(child, state)
                    is BoxComponent -> BoxRenderer.Render(child, state, dispatcher)
                    is ListComponent -> ListRenderer.Render(child, state, dispatcher)
                    is SpacerComponent -> {
                        val baseModifier = child.modifier?.toComposeModifier() ?: Modifier
                        val finalModifier = child.modifier?.weight?.let { w ->
                            baseModifier.then(Modifier.weight(w))
                        } ?: baseModifier
                        Spacer(modifier = finalModifier)
                    }

                    is CardComponent -> Render(child, state, dispatcher)
                    is IconComponent -> IconRenderer.Render(child, state, dispatcher)
                    else -> {}
                }
            }
        }
    }
}
