package github.detrig.uikit.components.image

import github.detrig.uikit.core.Action
import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("image")
data class ImageComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,

    val url: String? = null,
    val contentDescription: String? = null,
    val contentScale: ContentScaleType? = null,
    val placeholder: String? = null,
    val error: String? = null,
    val scaleType: String? = null
) : Component()



@Serializable
enum class ContentScaleType {
    Fill,
    FillHeight,
    Crop,
    FillWidth,
    Inside,
    None,
    FillBounds
}