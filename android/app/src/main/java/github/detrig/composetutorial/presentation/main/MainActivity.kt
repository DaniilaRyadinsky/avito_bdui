package github.detrig.composetutorial.presentation.main

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.LocalActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import github.detrig.composetutorial.core.navigation.NavigationRegistry
import github.detrig.composetutorial.di.ProvideViewModel

class MainActivity : ComponentActivity() {
    private lateinit var viewModel: MainViewModel
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = (application as ProvideViewModel).viewModel(MainViewModel::class.java)
        viewModel.init(savedInstanceState == null)
        setContent {
            Surface(
                modifier = Modifier
                    .fillMaxSize()
                    .systemBarsPadding(),
                color = MaterialTheme.colorScheme.background
            ) {
                Container(viewModel)
            }
        }
    }
}

@Composable
fun Container(viewModel: MainViewModel) {
    val state by viewModel.screen().collectAsState()
    val activity = LocalActivity.current

    BackHandler {
        if (!viewModel.comeback()) {
            activity?.finish()
        }
    }
    state.Show()
}
