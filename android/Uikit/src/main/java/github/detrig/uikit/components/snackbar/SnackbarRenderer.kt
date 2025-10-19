
import android.util.Log
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.components.snackbar.SnackbarComponent
import github.detrig.uikit.components.utils.toComposeModifier
import github.detrig.uikit.core.ActionDispatcher

object SnackbarRenderer {
    @Composable
    fun Render(component: SnackbarComponent, state: ScreenState, dispatcher: ActionDispatcher) {
        val visible = state.isSnackbarVisible(component.id ?: "")


        AnimatedVisibility(
            visible = visible,
            enter = fadeIn() + slideInVertically { it },
            exit = fadeOut() + slideOutVertically { it },
            modifier = component.modifier?.toComposeModifier() ?: Modifier
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
                    .background(Color(0xFF141414), RoundedCornerShape(32.dp))
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = if (component.actionText.isNullOrEmpty())
                    Arrangement.Center else Arrangement.SpaceBetween
            ) {
                Text(
                    component.text,
                    color = Color.White,
                )

                component.actionText?.takeIf { it.isNotEmpty() }?.let { actionText ->
                    TextButton(
                        modifier = Modifier.background(Color.White, RoundedCornerShape(16.dp)),
                        onClick = {
//                        component.actions?.forEach { dispatcher.dispatch(it) }
//                        state.hideSnackbar(component.id ?: "")
                        }
                    ) {
                        Text(
                            actionText,
                            color = Color.Black,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }
                }
            }
        }
    }
}