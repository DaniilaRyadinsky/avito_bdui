package github.detrig.uikit.components.text

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("text")
data class TextComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
    val style: TextStyle? = null,
    val text: String? = null,
    val format: String? = null,                //  "(%s)"
) : Component()