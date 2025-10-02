package github.detrig.uikit.custom_components

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import github.detrig.uikit.core.Action
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("cart_item")
data class CartItemComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
    val title: String,
    val price: Float,
    val imageUrl: String,
    val isChecked: Boolean = false,
    val isFavorite: Boolean = false,
    val quantity: Int = 1,
    val actions: List<Action>? = null
) : Component()