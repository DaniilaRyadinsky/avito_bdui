package github.detrig.composetutorial.core

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import github.detrig.composetutorial.core.navigation.Navigation
import github.detrig.composetutorial.data.NetworkRepository
import github.detrig.composetutorial.domain.handlers.FetchDataHandler
import github.detrig.composetutorial.domain.handlers.ShowBottomSheetHandler
import github.detrig.composetutorial.domain.handlers.ShowSnackbarHandler
import github.detrig.composetutorial.domain.model.ReloadScreenMessage
import github.detrig.composetutorial.domain.repository.ScreenRepository
import github.detrig.composetutorial.ui.theme.common.UiState
import github.detrig.uikit.components.screen.ScreenComponent
import github.detrig.uikit.components.screen.ScreenParser
import github.detrig.uikit.components.utils.SetValueHandler
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.core.Action
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.states.DataState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

open class ScreenViewModel(
    private val navigation: Navigation.Mutable,
    private val repository: ScreenRepository,
    private val networkRepository: NetworkRepository,
    private val dispatcher: ActionDispatcher
) : ViewModel() {

    protected val _screenComponent = MutableStateFlow<ScreenComponent?>(null)
    val screenComponent: StateFlow<ScreenComponent?> = _screenComponent

    protected val _screenState = MutableStateFlow<ScreenState?>(null)
    val screenState: StateFlow<ScreenState?> = _screenState

    protected val _screenUiState = MutableStateFlow<UiState<ScreenComponent>>(UiState.Initial)
    val screenUiState: StateFlow<UiState<ScreenComponent>> = _screenUiState

    protected fun registerHandlers(state: ScreenState, dataState: DataState) {
        dispatcher.register(Action.ShowSnackbar::class, ShowSnackbarHandler(state))
        dispatcher.register(Action.SetValue::class, SetValueHandler(state))
        dispatcher.register(Action.ShowBottomSheet::class, ShowBottomSheetHandler(state))
        dispatcher.register(
            Action.FetchData::class,
            FetchDataHandler(
                networkRepository,
                dataState
            )
        )
    }

    protected fun observeScreenUpdates(screenId: String) {
        viewModelScope.launch {
            repository.observeScreen(screenId).collect { jsonString ->
                try {
                    val message =
                        ScreenParser.json.decodeFromString<ReloadScreenMessage>(jsonString)
                    if (message.data.id == screenId) {
                        val json = repository.getScreenJson(message.data.id)
                        val screen = ScreenParser.parse(json)

                        if (message.data.id == screenId) {
                            _screenComponent.value = screen
                            _screenState.value?.updateFrom(screen)
                            _screenUiState.value = UiState.Success(screen)
                        }
                    }
                } catch (e: Exception) {
                    Log.e("alz-04", "Error parsing screen update", e)
                }
            }
        }
    }

    public suspend fun loadScreenJson(screenId: String): ScreenComponent? =
        try {
            val json = repository.getScreenJson(screenId)
            ScreenParser.parse(json)
        } catch (e: Exception) {
            Log.e("alz-04", "Error loading screen JSON for $screenId", e)
            null
        }
}
