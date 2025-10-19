package github.detrig.composetutorial.presentation.universalscreen

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalContext
import github.detrig.composetutorial.core.Screen
import github.detrig.composetutorial.di.ProvideViewModel
import github.detrig.composetutorial.presentation.cart.CartViewModel
import github.detrig.composetutorial.ui.theme.common.UiStateHandler
import github.detrig.uikit.components.screen.ScreenRenderer
import github.detrig.uikit.states.ScreenState

//object UniversalScreen : Screen {
//    private const val SCREEN_ID = "4229a954-e2b3-4df4-adfc-e2a57954f68b"
//
//    @Composable
//    override fun Show() {
//        val viewModel =
//            (LocalContext.current.applicationContext as ProvideViewModel)
//                .viewModel(CartViewModel::class.java)
//
//        LaunchedEffect(Unit) {
//            viewModel.loadScreen(SCREEN_ID)
//        }
//
//        val screenUiState by viewModel.screenUiState.collectAsState()
//
//        UiStateHandler.ScreenStateHandler(
//            uiState = screenUiState,
//            fetchScreenJson = { screenId -> viewModel.loadScreenJson(screenId) },
//            onRetry = { } //viewModel.loadScreenFromJsonString(json) }
//        ) { screenComponent ->
//
//            ScreenRenderer.Render(screenComponent, ScreenState(screenComponent), viewModel.dispatcher)
//        }
//    }
//}