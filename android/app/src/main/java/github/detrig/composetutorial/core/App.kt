package github.detrig.composetutorial.core

import android.app.Application
import androidx.lifecycle.ViewModel
import github.detrig.composetutorial.di.ProvideViewModel

class App : Application(), ProvideViewModel {

    private val map = mutableMapOf<Class<out ViewModel>, ViewModel>()

    private val core = Core.Base()

    private val provideViewModel = ProvideViewModel.Base(core)

    override fun <T : ViewModel> viewModel(clasz: Class<T>): T {
        return if (map.containsKey(clasz)) {
            map[clasz] as T
        } else {
            val viewModel = provideViewModel.viewModel(clasz)
            map[clasz] = viewModel
            viewModel
        }
    }
}