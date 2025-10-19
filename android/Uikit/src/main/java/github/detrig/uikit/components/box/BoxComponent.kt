package github.detrig.uikit.components.box

import github.detrig.uikit.components.row.PolymorphicListSerializer
import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import github.detrig.uikit.core.Action
import kotlinx.serialization.Polymorphic
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("box")
data class BoxComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
    override val actions: List<Action>? = null,

    @Serializable(with = PolymorphicListSerializer::class)
    val children: List<Component> = emptyList()
) : Component()