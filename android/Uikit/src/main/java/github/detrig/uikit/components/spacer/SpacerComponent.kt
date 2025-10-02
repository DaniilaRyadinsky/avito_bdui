package github.detrig.uikit.components.spacer

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("spacer")
data class SpacerComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
) : Component()