package github.detrig.composetutorial.presentation.makeorder

import androidx.lifecycle.viewModelScope
import github.detrig.composetutorial.presentation.cart.CartScreen
import github.detrig.composetutorial.core.navigation.Navigation
import github.detrig.composetutorial.core.ScreenViewModel
import github.detrig.composetutorial.data.NetworkRepository
import github.detrig.composetutorial.domain.repository.ScreenRepository
import github.detrig.composetutorial.ui.theme.common.UiState
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.states.DataState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class MakeOrderViewModel(
    private val navigation: Navigation.Mutable,
    val dispatcher: ActionDispatcher,
    screenRepository: ScreenRepository,
    networkRepository: NetworkRepository
) : ScreenViewModel(navigation, screenRepository, networkRepository, dispatcher) {

    private val dataState = DataState()

    private val _makeOrderScreenState = MutableStateFlow<ScreenState?>(null)
    val makeOrderScreenState: StateFlow<ScreenState?> = _makeOrderScreenState

    fun loadScreen(screenId: String) {
        viewModelScope.launch {
            val screen = loadScreenJson(screenId) ?: return@launch

            val isFirstLoad = _makeOrderScreenState.value == null

            if (isFirstLoad) {
                val state = ScreenState(screen)
                _makeOrderScreenState.value = state
                registerHandlers(state, dataState)
                observeScreenUpdates(screenId)
            } else {
                _makeOrderScreenState.value?.updateFrom(screen)
            }

            _screenComponent.value = screen
            _screenUiState.value = UiState.Success(screen)
        }
    }

    fun getDataStateFroScreen(): DataState = dataState
}