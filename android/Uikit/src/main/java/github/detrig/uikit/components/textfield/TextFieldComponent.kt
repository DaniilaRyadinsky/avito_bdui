package github.detrig.uikit.components.textfield

import github.detrig.uikit.components.text.TextStyle
import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("textField")
data class TextFieldComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
    val value: String? = null,               // начальное значение
    val placeholder: String? = null,
    val enabled: Boolean = true,
    val singleLine: Boolean = true,
    val style: TextStyle? = null
) : Component()