package github.detrig.composetutorial.presentation.shippingmethod

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalContext
import github.detrig.composetutorial.core.Screen
import github.detrig.composetutorial.di.ProvideViewModel
import github.detrig.composetutorial.ui.theme.common.UiStateHandler
import github.detrig.uikit.components.screen.ScreenRenderer
import github.detrig.uikit.states.ScreenState

object ShippingMethodScreen : Screen {
    const val SCREEN_ID = "73301680-575f-4453-9e8f-f8ea073ae6a1"

    @Composable
    override fun Show() {
        val viewModel = (LocalContext.current.applicationContext as ProvideViewModel).viewModel(
            ShippingMethodViewModel::class.java
        )

        LaunchedEffect(Unit) {
            viewModel.loadScreen(ShippingMethodScreen.SCREEN_ID)
        }

        val screenUiState by viewModel.screenUiState.collectAsState()

        UiStateHandler.ScreenStateHandler(
            uiState = screenUiState,
            fetchScreenJson = { screenId -> viewModel.loadScreenJson(screenId) },
            onRetry = { } // { viewModel.loadScreenById(SCREEN_ID) }
        ) { screenComponent ->
            ScreenRenderer.Render(
                screenComponent,
                viewModel.shippingScreenState.value ?: ScreenState(screenComponent),
                viewModel.getDataStateFroScreen(),
                viewModel.dispatcher
            )
        }
    }
}