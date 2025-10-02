package github.detrig.composetutorial.presentation.cart

import github.detrig.uikit.components.screen.ScreenComponent
import java.io.Serializable

sealed interface CartUiState : Serializable {
    data object Initial : CartUiState
    data object Loading : CartUiState
    data class Error(val message: String) : CartUiState
    data object CartEmpty : CartUiState
    data class Success(val screenComponent: ScreenComponent) : CartUiState
}