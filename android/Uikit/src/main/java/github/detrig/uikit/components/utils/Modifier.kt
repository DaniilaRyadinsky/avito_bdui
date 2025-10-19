package github.detrig.uikit.components.utils
import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import kotlinx.serialization.Serializable
import androidx.core.graphics.toColorInt

@Serializable
data class ModifierModel(
    val width: String? = null,           // fixed, wrap_content, match_parent
    val height: String? = null,
    val weight: Float? = null,
    val fillMaxWidth: Boolean? = null,
    val fillMaxHeight: Boolean? = null,
    val size: Size? = null,              // width/height
    val padding: Padding? = null,
    val margin: Margin? = null,
    val scrollable: Boolean? = null,
    val border: Border? = null,
    val align: String? = null,           // start, center, end
    val clip: Shape? = null,
    val background: String? = null,
    val clickable: Boolean? = null,
    val alpha: Float? = 1.0f,
    val shadow: Shadow? = null
)

@Serializable
data class Size(
    val width: String? = null,
    val height: String? = null
)

@Serializable
data class Padding(
    val start: Int? = null,
    val end: Int? = null,
    val top: Int? = null,
    val bottom: Int? = null,
)

@Serializable
data class Margin(
    val start: Int? = null,
    val end: Int? = null,
    val top: Int? = null,
    val bottom: Int? = null,
)

@Serializable
data class Border(
    val color: String? = null,
    val width: Int? = null
)

@Serializable
data class Shape(
    val cornerRadius: Int? = null
)

@Serializable
data class Shadow(
    val elevation: Int? = null,
    val color: String? = null
)

fun ModifierModel.toComposeModifier(
    onClick: (() -> Unit)? = null
): Modifier {
    var modifier: Modifier = Modifier

    //Margin
    this.margin?.let { margin ->
        val start = margin.start?.dp ?: 0.dp
        val end = margin.end?.dp ?: 0.dp
        val top = margin.top?.dp ?: 0.dp
        val bottom = margin.bottom?.dp ?: 0.dp
        modifier = modifier.padding(start = start, end = end, top = top, bottom = bottom)
    }

    if (this.fillMaxWidth == true) {
        modifier = modifier.fillMaxWidth()
    }
    if (this.fillMaxHeight == true) {
        modifier = modifier.fillMaxHeight()
    }

    val width = size?.width
    val height = size?.height

    when (width) {
        "wrap_content", null -> {} // ничего не делаем — wrap_content
        else -> width.toIntOrNull()?.dp?.let { modifier = modifier.width(it) }
    }

    when (height) {
        "wrap_content", null -> {} // ничего не делаем
        else -> height.toIntOrNull()?.dp?.let { modifier = modifier.height(it) }
    }

    var cornerShape: RoundedCornerShape? = null
    this.clip?.cornerRadius?.let { radius ->
        cornerShape = RoundedCornerShape(radius.dp)
        modifier = modifier.clip(cornerShape)
    }

    this.background?.let { colorHex ->
        modifier = modifier.background(Color(colorHex.toColorInt()))
    }

    if (clickable == true && onClick != null) {
        modifier = modifier.clickable(onClick = onClick)
    }

    if (this.alpha != null && this.alpha < 1f) {
        modifier = modifier.alpha(this.alpha)
    }

    this.border?.let { border ->
        val color = border.color?.let { Color(it.toColorInt()) } ?: Color.Black
        val width = border.width?.dp ?: 0.dp
        val shape = cornerShape ?: RoundedCornerShape(0.dp)
        if (width > 0.dp)
            modifier = modifier.border(width, color, shape)
    }

    this.padding?.let { padding ->
        val start = padding.start?.dp ?: 0.dp
        val end = padding.end?.dp ?: 0.dp
        val top = padding.top?.dp ?: 0.dp
        val bottom = padding.bottom?.dp ?: 0.dp
        modifier = modifier.padding(start = start, end = end, top = top, bottom = bottom)
    }

    return modifier
}