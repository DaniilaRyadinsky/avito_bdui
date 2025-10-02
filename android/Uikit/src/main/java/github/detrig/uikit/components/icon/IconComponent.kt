package github.detrig.uikit.components.icon

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import github.detrig.uikit.core.Action
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("icon")
data class IconComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,

    val icon: String? = null,
    val contentDescription: String? = null,
    val tint: String? = null,
    val actions: List<Action>? = null
) : Component()
