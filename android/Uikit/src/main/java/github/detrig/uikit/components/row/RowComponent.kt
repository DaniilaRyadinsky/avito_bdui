package github.detrig.uikit.components.row

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import kotlinx.serialization.KSerializer
import kotlinx.serialization.Polymorphic
import kotlinx.serialization.PolymorphicSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

@Serializable
@SerialName("row")
data class RowComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
    val verticalAlignment: String? = null,
    val horizontalArrangement: String? = null,
    @Serializable(with = PolymorphicListSerializer::class)
    val children: List<Component> = emptyList()
) : Component()

object PolymorphicListSerializer :
    KSerializer<List<Component>> {
    private val listSerializer = ListSerializer(PolymorphicSerializer(Component::class))
    override val descriptor: SerialDescriptor = listSerializer.descriptor
    override fun serialize(encoder: Encoder, value: List<Component>) {
        listSerializer.serialize(encoder, value)
    }

    override fun deserialize(decoder: Decoder): List<Component> {
        return listSerializer.deserialize(decoder)
    }
}
