package github.detrig.uikit.components.text

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import github.detrig.uikit.core.Action
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("text")
data class TextComponent(
    @SerialName("_id")
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
    override val actions: List<Action>? = null,
    val style: TextStyle? = null,
    var text: String? = null,
    val format: String? = null,                //  "(%s)"
) : Component()