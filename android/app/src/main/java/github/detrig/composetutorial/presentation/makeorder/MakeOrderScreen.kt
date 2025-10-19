package github.detrig.composetutorial.presentation.makeorder

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import github.detrig.composetutorial.core.Screen
import github.detrig.composetutorial.di.ProvideViewModel
import github.detrig.composetutorial.presentation.cart.CartScreen
import github.detrig.composetutorial.ui.theme.common.UiStateHandler
import github.detrig.uikit.components.screen.ScreenRenderer
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.core.ActionDispatcher


object MakeOrderScreen : Screen {
    const val SCREEN_ID = "d8ca047f-9c92-4150-a8fd-a79c359e54df"

    @Composable
    override fun Show() {
        val viewModel = (LocalContext.current.applicationContext as ProvideViewModel).viewModel(
            MakeOrderViewModel::class.java
        )

        LaunchedEffect(Unit) {
            viewModel.loadScreen(MakeOrderScreen.SCREEN_ID)
        }

        val screenUiState by viewModel.screenUiState.collectAsState()

        UiStateHandler.ScreenStateHandler(
            uiState = screenUiState,
            fetchScreenJson = { screenId -> viewModel.loadScreenJson(screenId) },
            onRetry = { } // { viewModel.loadScreenById(SCREEN_ID) }
        ) { screenComponent ->
            ScreenRenderer.Render(screenComponent, viewModel.makeOrderScreenState.value ?: ScreenState(screenComponent), viewModel.getDataStateFroScreen(), viewModel.dispatcher)
        }
    }
}