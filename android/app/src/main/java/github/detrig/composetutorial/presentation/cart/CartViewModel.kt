package github.detrig.composetutorial.presentation.cart

import androidx.lifecycle.viewModelScope
import github.detrig.composetutorial.core.Navigation
import github.detrig.composetutorial.core.ScreenViewModel
import github.detrig.composetutorial.domain.repository.ScreenRepository
import github.detrig.uikit.core.NavigationHandler
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class CartViewModel(
    private val navigation: Navigation.Mutable,
    navigationHandler: NavigationHandler,
    screenRepository: ScreenRepository
) : ScreenViewModel(screenRepository, navigationHandler) {

    private val _cartUiState = MutableStateFlow<CartUiState>(CartUiState.Initial)
    val cartUiState: StateFlow<CartUiState> = _cartUiState

    fun loadCart() {
        _cartUiState.value = CartUiState.Loading

        viewModelScope.launch {
            try {
                val screenComponent = loadScreenJson("cart_screen") ?: return@launch

                if (screenComponent.content.isEmpty()) {
                    _cartUiState.value = CartUiState.CartEmpty
                } else {
                    _cartUiState.value = CartUiState.Success(screenComponent)
                }

            } catch (e: Exception) {
                _cartUiState.value = CartUiState.Error(e.message ?: "Unknown error")
            }
        }
    }
}
