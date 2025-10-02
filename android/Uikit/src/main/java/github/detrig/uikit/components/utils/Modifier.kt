package github.detrig.uikit.components.utils
import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import kotlinx.serialization.Serializable

@Serializable
data class ModifierModel(
    val width: String? = null,           // fixed, wrap_content, match_parent
    val height: String? = null,
    val weight: Float? = null,
    val fillMaxWidth: Boolean? = null,
    val fillMaxHeight: Boolean? = null,
    val size: Size? = null,              // width/height
    val padding: Padding? = null,
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
    val all: Int? = null
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

fun ModifierModel.toComposeModifier(): Modifier {
    var modifier: Modifier = Modifier


    val widthDp = when (size?.width) {
        "wrap_content" -> null
        "match_parent" -> {
            modifier = modifier.fillMaxWidth()
            null
        }
        else -> size?.width?.toIntOrNull()?.dp
    }

    val heightDp = when (size?.height) {
        "wrap_content" -> null
        "match_parent" -> {
            modifier = modifier.fillMaxHeight()
            null
        }
        else -> size?.height?.toIntOrNull()?.dp
    }

    if (widthDp != null || heightDp != null) {
        modifier = modifier.then(
            when {
                widthDp != null && heightDp != null -> Modifier.size(widthDp, heightDp)
                widthDp != null -> Modifier.width(widthDp)
                heightDp != null -> Modifier.height(heightDp)
                else -> Modifier
            }
        )
    }


    if (this.fillMaxWidth == true) {
        modifier = modifier.fillMaxWidth()
    }
    if (this.fillMaxHeight == true) {
        modifier = modifier.fillMaxHeight()
    }

    this.padding?.let { padding ->
        val p = padding.all?.dp ?: 0.dp
        val start = padding.start?.dp ?: p
        val end = padding.end?.dp ?: p
        val top = padding.top?.dp ?: p
        val bottom = padding.bottom?.dp ?: p
        modifier = modifier.padding(start = start, end = end, top = top, bottom = bottom)
    }

    this.clip?.cornerRadius?.let { radius ->
        modifier = modifier.clip(RoundedCornerShape(radius.dp))
    }

    this.background?.let { colorHex ->
        modifier = modifier.background(Color(android.graphics.Color.parseColor(colorHex)))
    }

    if (this.clickable == true) {
        modifier = modifier.clickable() { /* onClick добавить позже */ }
    }

    if (this.alpha != null && this.alpha < 1f) {
        modifier = modifier.alpha(this.alpha)
    }

    return modifier
}