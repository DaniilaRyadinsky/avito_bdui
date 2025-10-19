package github.detrig.composetutorial.presentation.cart

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalContext
import github.detrig.composetutorial.core.Screen
import github.detrig.composetutorial.di.ProvideViewModel
import github.detrig.uikit.components.screen.ScreenRenderer
import github.detrig.composetutorial.ui.theme.common.UiStateHandler

object CartScreen : Screen {
    const val SCREEN_ID = "7e01bcea-4186-45ba-87c6-0efa7f81b3b5"

    @Composable
    override fun Show() {
        val viewModel = (LocalContext.current.applicationContext as ProvideViewModel).viewModel(
            CartViewModel::class.java
        )

        LaunchedEffect(Unit) {
            viewModel.loadScreen(SCREEN_ID)
        }

        val screenUiState by viewModel.screenUiState.collectAsState()
//        val screenState by viewModel.cartScreenState.collectAsState()


        UiStateHandler.ScreenStateHandler(
            uiState = screenUiState,
            fetchScreenJson = { screenId -> viewModel.loadScreenJson(screenId) },
            onRetry = { } //viewModel.loadScreen(SCREEN_ID) }
        ) { screenComponent ->
            ScreenRenderer.Render(screenComponent, viewModel.cartScreenState.collectAsState().value!!, viewModel.getDataStateFroScreen(), viewModel.dispatcher)
        }
    }
}