package github.detrig.uikit.components.icon

import android.util.Log
import androidx.compose.foundation.clickable
import androidx.compose.material3.Icon
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.painterResource
import github.detrig.uikit.R
import github.detrig.uikit.components.utils.toComposeModifier
import java.util.Locale
import androidx.core.graphics.toColorInt
import github.detrig.uikit.components.screen.ScreenState
import github.detrig.uikit.core.ActionDispatcher


object IconRenderer {

    @Composable
    fun Render(component: IconComponent, state: ScreenState? = null, dispatcher: ActionDispatcher? = null, modifier: Modifier = Modifier) {
        val modifier = (component.modifier?.toComposeModifier() ?: Modifier)
            .let { base ->
                if (component.actions != null && component.actions.isNotEmpty()) {
                    base.clickable {
                        component.actions.forEach { dispatcher?.dispatch(it) }
                    }
                } else base
            }


        val iconName = component.icon?.lowercase(Locale.getDefault())
        val vector: ImageVector? = when (iconName) {
            "home" -> Icons.Default.Home
            "settings" -> Icons.Default.Settings
            "info" -> Icons.Default.Info
            "favorite_border" -> Icons.Default.Favorite
            "delete" -> Icons.Default.Delete
            "back" -> Icons.Default.ArrowBack
            else -> null
        }

        val tintColor = component.tint?.let { Color(it.toColorInt()) } ?: Color.Unspecified

        if (vector != null) {
            Icon(
                imageVector = vector,
                contentDescription = component.contentDescription,
                modifier = modifier,
                tint = tintColor
            )
        } else {
            Icon(
                painter = painterResource(id = R.drawable.img_1),
                contentDescription = component.contentDescription,
                modifier = modifier,
                tint = tintColor
            )
        }
    }
}