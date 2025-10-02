package github.detrig.uikit.components.image

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import coil.compose.AsyncImage
import coil.request.ImageRequest
import github.detrig.uikit.components.screen.ScreenState
import github.detrig.uikit.components.utils.toComposeModifier

object ImageRenderer {

    @Composable
    fun Render(component: ImageComponent, state: ScreenState, modifier: Modifier = Modifier) {

        AsyncImage(
            model = ImageRequest.Builder(LocalContext.current)
                .data(component.url)
                .crossfade(true)
                .listener(
                    onError = { request, throwable ->
                        Log.e("alz-img", "Load error: ${throwable.throwable.message}")
                    },
                    onSuccess = { _, _ ->
                        Log.d("alz-img", "Image loaded successfully")
                    }
                )
                .build(),
            contentDescription = component.contentDescription,
            modifier = (component.modifier?.toComposeModifier() ?: Modifier),
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
