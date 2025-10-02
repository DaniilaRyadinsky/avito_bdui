package github.detrig.composetutorial.ui.theme.common

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.produceState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import java.io.Serializable

sealed interface UiState<out T> : Serializable {
    data object Initial : UiState<Nothing>
    data object Loading : UiState<Nothing>
    data class Success<T>(val data: T) : UiState<T>
    data class Error(val message: String) : UiState<Nothing>
    data object Empty : UiState<Nothing>
}

object UiStateHandler {

    private const val LOADING_SCREEN_ID = ""
    private const val ERROR_SCREEN_ID = "c01d04b9-cd45-4eda-85ad-d6d5b979c870"

    @Composable
    fun <T> ScreenStateHandler(
        uiState: UiState<T>,
        fetchScreenJson: suspend (id: String) -> T?,
        onRetry: () -> Unit = {},
        content: @Composable (T) -> Unit
    ) {
        when (uiState) {
            is UiState.Initial,
            is UiState.Loading -> {
//                val loadingData by produceState<T?>(initialValue = null, LOADING_SCREEN_ID) {
//                    value = fetchScreenJson(LOADING_SCREEN_ID)
//                }

//                if (loadingData != null) {
//                    content(loadingData!!)
//                } else {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(Color.White),
                        contentAlignment = Alignment.Center
                    ) {
                        CircularProgressIndicator(
                            modifier = Modifier.size(48.dp),
                            color = Color.Black
                        )
                    //}
                }
            }

            is UiState.Error -> {
                val errorData by produceState<T?>(initialValue = null, ERROR_SCREEN_ID) {
                    value = fetchScreenJson(ERROR_SCREEN_ID)
                }

                if (errorData != null) {
                    content(errorData!!)
                } else {
                    Column(
                        modifier = Modifier.fillMaxSize(),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        Text("Error: ${uiState.message}")
                        Spacer(modifier = Modifier.height(8.dp))
                        Button(onClick = onRetry) { Text("Retry") }
                    }
                }
            }

            is UiState.Empty -> {
                Text("No data available", modifier = Modifier.padding(16.dp))
            }

            is UiState.Success -> content(uiState.data)
        }
    }
}
