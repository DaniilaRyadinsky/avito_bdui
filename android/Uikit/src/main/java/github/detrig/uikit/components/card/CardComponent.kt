package github.detrig.uikit.components.card

import github.detrig.uikit.components.row.PolymorphicListSerializer
import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import github.detrig.uikit.components.utils.Shape
import kotlinx.serialization.Polymorphic
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("card")
data class CardComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,

    val elevation: Int? = null,
    val shape: Shape? = null,
    val background: String? = null,
    @Serializable(with = PolymorphicListSerializer::class)
    val children: List<Component> = emptyList()
) : Component()