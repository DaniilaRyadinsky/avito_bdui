package github.detrig.uikit.components.text

import kotlinx.serialization.Serializable

@Serializable
data class TextStyle(
    val fontSize: Int? = null,
    val fontWeight: String? = null,
    val fontStyle: String? = null,
    val color: String? = null,
    val lineHeight: Int? = null,
    val letterSpacing: Float? = null,
    val textDecoration: String? = null,    // none, underline, lineThrough
    val textAlign: String? = null,         // start, center, end, justify
    val maxLines: Int? = null,
    val overflow: String? = null           // clip, ellipsis, visible
)
