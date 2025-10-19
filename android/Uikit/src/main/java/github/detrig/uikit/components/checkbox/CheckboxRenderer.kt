package github.detrig.uikit.components.checkbox

import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.graphics.toColorInt
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.components.utils.toComposeModifier
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.core.ActionEvent
import github.detrig.uikit.core.performActionsForEvent

object CheckboxRenderer {

    @Composable
    fun Render(component: CheckboxComponent, dispatcher: ActionDispatcher, state: ScreenState, modifier: Modifier = Modifier) {
       // var checked by remember { mutableStateOf(component.isChecked) }

        var checked by remember { mutableStateOf(component.isChecked) }

        val checkedColor = component.colors?.checkedColor?.let { Color(it.toColorInt()) } ?: Color(0xFF965EEB)
        val uncheckedColor = component.colors?.uncheckedColor?.let { Color(it.toColorInt()) } ?: Color.Gray
        val disabledColor = component.colors?.disabledColor?.let { Color(it.toColorInt()) } ?: Color.LightGray

        val onClick = if (component.actions?.any { it.event == ActionEvent.OnClick } == true) {
            { component.performActionsForEvent(ActionEvent.OnClick, dispatcher) }
        } else null


        Checkbox(
            checked = checked,
            onCheckedChange = { newValue ->
                checked = newValue
                component.isChecked = newValue
                component.performActionsForEvent(ActionEvent.OnValueChange, dispatcher)
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
