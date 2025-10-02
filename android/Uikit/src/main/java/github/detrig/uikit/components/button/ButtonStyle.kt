package github.detrig.uikit.components.button

import github.detrig.uikit.components.utils.Shape
import kotlinx.serialization.Serializable

@Serializable
data class ButtonStyle(
    val background: String? = null,
    val textColor: String? = null,
    val fontSize: Int? = null,
    val fontWeight: String? = null,   // normal, bold, medium
    val fontStyle: String? = null,    // normal, italic
    val shape: Shape? = null,
    val border: Border? = null,
    val elevation: Int? = null
)

@Serializable
data class Border(
    val width: Int? = null,
    val color: String? = null
)