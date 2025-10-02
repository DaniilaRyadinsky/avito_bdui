package github.detrig.uikit.components.checkbox

import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.graphics.toColorInt
import github.detrig.uikit.components.screen.ScreenState
import github.detrig.uikit.components.utils.toComposeModifier

object CheckboxRenderer {

    @Composable
    fun Render(component: CheckboxComponent, state: ScreenState, modifier: Modifier = Modifier) {
       // var checked by remember { mutableStateOf(component.isChecked) }

        val checkedColor = component.colors?.checkedColor?.let { Color(it.toColorInt()) } ?: Color(0xFF965EEB)
        val uncheckedColor = component.colors?.uncheckedColor?.let { Color(it.toColorInt()) } ?: Color.Gray
        val disabledColor = component.colors?.disabledColor?.let { Color(it.toColorInt()) } ?: Color.LightGray

        Checkbox(
            checked = component.isChecked,
            onCheckedChange = { newValue ->
//                checked = newValue
//                component.onCheckedChange?.let { actionId ->
//                    state.executeAction(actionId, newValue)
//                }
            },
            enabled = component.enabled,
            colors = CheckboxDefaults.colors(
                checkedColor = checkedColor,
                uncheckedColor = uncheckedColor,
                disabledCheckedColor = disabledColor,
                disabledUncheckedColor = disabledColor
            ),
            modifier = (component.modifier?.toComposeModifier() ?: Modifier),
        )
    }
}
