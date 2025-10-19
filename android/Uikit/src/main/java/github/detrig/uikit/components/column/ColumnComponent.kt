package github.detrig.uikit.components.column

import github.detrig.uikit.components.row.PolymorphicListSerializer
import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import github.detrig.uikit.core.Action
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("column")
data class ColumnComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
    override val actions: List<Action>? = null,

    val verticalArrangement: String? = null,     // top, center, bottom, spaceBetween, spaceAround, spaceEvenly
    val horizontalAlignment: String? = null,     // start, center, end
    @Serializable(with = PolymorphicListSerializer::class)
    val children: List<Component> = emptyList()

) : Component()