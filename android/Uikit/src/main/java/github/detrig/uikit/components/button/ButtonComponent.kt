package github.detrig.uikit.components.button

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import github.detrig.uikit.core.Action
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("button")
data class ButtonComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
    val style: ButtonStyle? = null,
    val text: String? = null,
    val enabled: Boolean = true,
    val icon: String? = null,
    val actions: List<Action>? = null
) : Component()