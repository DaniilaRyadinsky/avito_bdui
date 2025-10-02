package github.detrig.uikit.custom_components

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("list")
data class ListComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
    val items: List<Component> = emptyList()
) : Component()