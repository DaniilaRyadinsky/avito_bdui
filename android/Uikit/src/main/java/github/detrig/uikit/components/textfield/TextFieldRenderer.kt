package github.detrig.uikit.components.textfield

import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.sp
import androidx.core.graphics.toColorInt
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.components.utils.toComposeModifier
import github.detrig.uikit.core.Action
import github.detrig.uikit.core.ActionDispatcher

object TextFieldRenderer {

    @Composable
    fun Render(component: TextFieldComponent, state: ScreenState, dispatcher: ActionDispatcher, modifier: Modifier = Modifier) {
        val value = state.getValue(component.id) as? String ?: ""

        val color = component.style?.color?.let { Color(it.toColorInt()) } ?: Color.Black
        val fontSize = (component.style?.fontSize ?: 16).sp
        val fontWeight = when (component.style?.fontWeight?.lowercase()) {
            "bold" -> FontWeight.Bold
            "medium" -> FontWeight.Medium
            "light" -> FontWeight.Light
            else -> FontWeight.Normal
        }
        val fontStyle =
            if (component.style?.fontStyle?.lowercase() == "italic") FontStyle.Italic else FontStyle.Normal

        val textAlign = when (component.style?.textAlign?.lowercase()) {
            "center" -> TextAlign.Center
            "end" -> TextAlign.End
            "justify" -> TextAlign.Justify
            else -> TextAlign.Start
        }

        OutlinedTextField(
            value = value,
            onValueChange = { newValue ->
                state.updateComponent(component.id ?: "", newValue)
//                dispatcher.dispatch(
//                    Action(
//                        action = "set_value",
//                        targetId = component.id,
//                        value = newValue
//                    )
//                )
            },
            enabled = component.enabled,
            singleLine = component.singleLine,
            placeholder = {
                if (!component.placeholder.isNullOrEmpty()) {
                    Text(
                        text = component.placeholder,
                        color = Color.Gray,
                        fontSize = fontSize,
                        fontWeight = fontWeight,
                        fontStyle = fontStyle,
                        textAlign = textAlign
                    )
                }
            },
            modifier = component.modifier?.toComposeModifier() ?: Modifier,
            textStyle = androidx.compose.ui.text.TextStyle(
                color = color,
                fontSize = fontSize,
                fontWeight = fontWeight,
                fontStyle = fontStyle,
                textAlign = textAlign
            )
        )
    }
}
