package github.detrig.uikit.components.text

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.core.graphics.toColorInt
import androidx.compose.material3.Text
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.TextUnit
import github.detrig.uikit.components.screen.ScreenState
import github.detrig.uikit.components.utils.toComposeModifier

object TextRenderer {

    @Composable
    fun Render(
        component: TextComponent,
        state: ScreenState,
        modifier: Modifier = Modifier // новый параметр
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
            modifier = (component.modifier?.toComposeModifier() ?: Modifier),
            textAlign = textAlign
        )
    }
}
