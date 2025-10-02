package github.detrig.composetutorial.presentation.makeorder

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import github.detrig.composetutorial.core.Screen
import github.detrig.composetutorial.di.ProvideViewModel
import github.detrig.composetutorial.ui.theme.common.UiStateHandler
import github.detrig.uikit.components.screen.ScreenRenderer
import github.detrig.uikit.components.screen.ScreenState
import github.detrig.uikit.core.ActionDispatcher


object MakeOrderScreen : Screen {
    private const val SCREEN_ID = "c01d04b9-cd45-4eda-85ad-d6d5b979c870"

    @Composable
    override fun Show() {
        val viewModel = (LocalContext.current.applicationContext as ProvideViewModel).viewModel(
            MakeOrderViewModel::class.java
        )

        val screenUiState by viewModel.screenUiState.collectAsState()

        UiStateHandler.ScreenStateHandler(
            uiState = screenUiState,
            fetchScreenJson = { screenId -> viewModel.loadScreenJson(screenId) },
            onRetry = { viewModel.loadScreenById(SCREEN_ID) }
        ) { screenComponent ->
            val dispatcher = remember(screenComponent) {
                ActionDispatcher(state = ScreenState(screenComponent)) { id ->
                    viewModel.navigateToScreenById(id)
                }.apply { registerDefaultActions() }
            }
            ScreenRenderer.Render(screenComponent, ScreenState(screenComponent), dispatcher)
        }
    }
}