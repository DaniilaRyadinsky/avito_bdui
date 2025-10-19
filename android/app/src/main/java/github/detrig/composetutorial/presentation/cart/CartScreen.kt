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
    //const val SCREEN_ID = "03213239-75dc-4393-8c88-c95d4c00cd5a"
    //const val SCREEN_ID = "3a7c12a5-6cb2-4bc3-bc0e-1549c405b413"
    const val SCREEN_ID = "7e01bcea-4186-45ba-87c6-0efa7f81b3b5"
    //const val SCREEN_ID = "a50e5b71-402e-4ac0-9acb-e8fc91f18c76"
    //const val SCREEN_ID = "d8ca047f-9c92-4150-a8fd-a79c359e54df"
    //const val SCREEN_ID = "76b729c3-9213-49df-91af-25259cc56162"
    //const val SCREEN_ID = "d8ca047f-9c92-4150-a8fd-a79c359e54df"
    //const val SCREEN_ID = "c1fcc58c-14a8-4ec1-b451-b0cbb1c36c03"
    //private const val SCREEN_ID = "4761c8a0-74bf-4733-8444-93faebb6f6da"
    //private const val SCREEN_ID = "21d7850d-1775-4610-9ccd-5896515aa381"
    //private const val SCREEN_ID = "9abfbcab-f242-4a1d-a3d4-0f4d9a84cd33"

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