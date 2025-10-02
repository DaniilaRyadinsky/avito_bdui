package github.detrig.uikit.components.checkbox

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("checkbox")
data class CheckboxComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,

    val isChecked: Boolean = false,
    val onCheckedChange: String? = null,
    val enabled: Boolean = true,
    val colors: CheckboxColors? = null
) : Component()

@Serializable
data class CheckboxColors(
    val checkedColor: String? = null,
    val uncheckedColor: String? = null,
    val disabledColor: String? = null
)