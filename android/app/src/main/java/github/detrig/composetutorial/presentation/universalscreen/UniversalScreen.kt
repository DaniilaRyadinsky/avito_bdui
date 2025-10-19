package github.detrig.composetutorial.presentation.universalscreen

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalContext
import github.detrig.composetutorial.core.Screen
import github.detrig.composetutorial.core.ScreenViewModel
import github.detrig.composetutorial.di.ProvideViewModel
import github.detrig.composetutorial.ui.theme.common.UiStateHandler
import github.detrig.uikit.components.screen.ScreenRenderer
import github.detrig.uikit.states.DataState
import github.detrig.uikit.states.ScreenState


//class UniversalScreen(private val screenId: String) : Screen {
//
//    @Composable
//    override fun Show() {
//        val vm = (LocalContext.current.applicationContext as ProvideViewModel)
//            .viewModel(ScreenViewModel::class.java)
//
//        LaunchedEffect(screenId) { vm.loadScreen(screenId) }
//
//        val uiState by vm.screenUiState.collectAsState()
//        UiStateHandler.ScreenStateHandler(
//            uiState = uiState,
//            fetchScreenJson = { id -> vm.loadScreenJson(id) },
//            onRetry = { vm.loadScreen(screenId) }
//        ) { screenComponent ->
//            ScreenRenderer.Render(
//                screenComponent,
//                vm.screenState.value ?: ScreenState(screenComponent),
//                dataState = vm.dataState,
//                vm.dispatcher
//            )
//        }
//    }
//}