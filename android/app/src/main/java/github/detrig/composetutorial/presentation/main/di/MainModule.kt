package github.detrig.composetutorial.presentation.main.di

import github.detrig.composetutorial.core.Core
import github.detrig.composetutorial.di.AbstractProvideViewModel
import github.detrig.composetutorial.di.Module
import github.detrig.composetutorial.di.ProvideViewModel
import github.detrig.composetutorial.presentation.main.MainViewModel

class MainModule(private val core: Core) : Module<MainViewModel> {
    override fun viewModel(): MainViewModel {
        return MainViewModel(core.navigation(), core.actionDispatcher())
    }
}

class ProvideMainViewModel(
    val core: Core,
    next: ProvideViewModel
) : AbstractProvideViewModel(core, next, MainViewModel::class.java) {
    override fun module(): Module<*> = MainModule(core)
}