package github.detrig.uikit.components.button

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.components.utils.toComposeModifier
import androidx.core.graphics.toColorInt
import github.detrig.uikit.R
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.core.ActionEvent
import github.detrig.uikit.core.performActionsForEvent


object ButtonRenderer {

    @Composable
    fun Render(component: ButtonComponent, state: ScreenState, dispatcher: ActionDispatcher, modifier: Modifier = Modifier) {

        Button(
            onClick = {
                component.performActionsForEvent(ActionEvent.OnClick, dispatcher)
            },
            enabled = component.enabled,
            modifier = (component.modifier?.toComposeModifier() ?: Modifier),
            colors = ButtonDefaults.buttonColors(
                containerColor = component.style?.background?.let { Color(it.toColorInt()) }
                    ?: MaterialTheme.colorScheme.primary,
                contentColor = component.style?.background?.let { Color(it.toColorInt()) }
                    ?: Color.White
            ),
            shape = component.style?.shape?.cornerRadius?.let { RoundedCornerShape(it.dp) } ?: RoundedCornerShape(0.dp),
            elevation = component.style?.elevation?.dp?.let { ButtonDefaults.elevatedButtonElevation(defaultElevation = it) }
                ?: ButtonDefaults.elevatedButtonElevation()
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                // с иконкой
                component.icon?.let { iconName ->
                    Icon(
                        painter = painterResource(id = getIconRes(iconName)),
                        contentDescription = iconName,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                }

                Text(
                    text = component.text ?: "",
                    fontSize = component.style?.fontSize?.sp ?: 16.sp,
                    fontWeight = when (component.style?.fontWeight?.lowercase()) {
                        "bold" -> FontWeight.Bold
                        "medium" -> FontWeight.Medium
                        else -> FontWeight.Normal
                    },
                    fontStyle = when (component.style?.fontStyle?.lowercase()) {
                        "italic" -> FontStyle.Italic
                        else -> FontStyle.Normal
                    },
                    color = component.style?.textColor?.let { Color(it.toColorInt()) }
                        ?: Color.White
                )
            }
        }
    }


    @Composable
    private fun getIconRes(name: String): Int {
        return when (name.lowercase()) {
            "back" -> R.drawable.img
            "favorite" -> R.drawable.img_1
            else -> R.drawable.img_1
        }
    }
}