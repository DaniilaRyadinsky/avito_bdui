package github.detrig.uikit.components.image

import android.graphics.Paint
import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import coil.compose.AsyncImage
import coil.request.ImageRequest
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.components.utils.toComposeModifier
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.core.ActionEvent
import github.detrig.uikit.core.performActionsForEvent

object ImageRenderer {

    @Composable
    fun Render(component: ImageComponent, state: ScreenState, dispatcher: ActionDispatcher, modifier: Modifier = Modifier) {
        val onClick = if (component.actions?.any { it.event == ActionEvent.OnClick } == true) {
            { component.performActionsForEvent(ActionEvent.OnClick, dispatcher) }
        } else null

        AsyncImage(
            model = ImageRequest.Builder(LocalContext.current)
                .data(component.url)
                .crossfade(true)
                .listener(
                    onError = { request, throwable ->
                    },
                    onSuccess = { _, _ ->
                    }
                )
                .build(),
            contentDescription = component.contentDescription,
            modifier = (component.modifier?.toComposeModifier(onClick) ?: Modifier),
            contentScale = when (component.contentScale) {
                ContentScaleType.Fill -> ContentScale.FillBounds
                ContentScaleType.FillHeight -> ContentScale.FillHeight
                ContentScaleType.FillWidth -> ContentScale.FillWidth
                ContentScaleType.Inside -> ContentScale.Inside
                ContentScaleType.None -> ContentScale.None
                ContentScaleType.FillBounds -> ContentScale.FillBounds
                ContentScaleType.Crop, null -> ContentScale.Crop
            }
            //placeholder = component.placeholder?.let { painterResource(id = getImageRes(it)) }, //TODO add local and url image
            //error = component.error?.let { painterResource(id = getImageRes(it)) }
        )
    }

}