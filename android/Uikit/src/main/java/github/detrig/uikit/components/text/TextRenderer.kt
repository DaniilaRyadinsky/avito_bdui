package github.detrig.uikit.components.text

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.core.graphics.toColorInt
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.TextUnit
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.components.utils.toComposeModifier
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.core.ActionEvent
import github.detrig.uikit.core.performActionsForEvent

object TextRenderer {

    @Composable
    fun Render(
        component: TextComponent,
        dispatcher: ActionDispatcher,
        state: ScreenState,
        modifier: Modifier = Modifier
    ) {
        val color = component.style?.color?.let { Color(it.toColorInt()) } ?: Color.Black
        val fontSize = (component.style?.fontSize ?: 16).sp
        val fontWeight = when(component.style?.fontWeight?.lowercase()) {
            "bold" -> FontWeight.Bold
            "medium" -> FontWeight.Medium
            "light" -> FontWeight.Light
            else -> FontWeight.Normal
        }
        val fontStyle = if (component.style?.fontStyle?.lowercase() == "italic") FontStyle.Italic else FontStyle.Normal

        val textAlign = when(component.style?.textAlign?.lowercase()) {
            "center" -> TextAlign.Center
            "end" -> TextAlign.End
            "justify" -> TextAlign.Justify
            else -> TextAlign.Start
        }

        val onClick = if (component.actions?.any { it.event == ActionEvent.OnClick } == true) {
            { component.performActionsForEvent(ActionEvent.OnClick, dispatcher) }
        } else null

        Text(
            text = component.text ?: "",
            color = color,
            fontSize = fontSize,
            fontWeight = fontWeight,
            fontStyle = fontStyle,
            maxLines = component.style?.maxLines ?: Int.MAX_VALUE,
            overflow = when(component.style?.overflow?.lowercase()) {
                "ellipsis" -> TextOverflow.Ellipsis
                "clip" -> TextOverflow.Clip
                else -> TextOverflow.Visible
            },
            lineHeight = component.style?.lineHeight?.sp ?: TextUnit.Unspecified,
            letterSpacing = component.style?.letterSpacing?.sp ?: TextUnit.Unspecified,
            modifier = (component.modifier?.toComposeModifier(onClick) ?: Modifier),
            textAlign = textAlign
        )
    }
}
