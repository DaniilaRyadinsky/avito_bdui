package github.detrig.composetutorial.presentation.makeorder.di

import github.detrig.composetutorial.core.Core
import github.detrig.composetutorial.di.AbstractProvideViewModel
import github.detrig.composetutorial.di.Module
import github.detrig.composetutorial.di.ProvideViewModel
import github.detrig.composetutorial.presentation.makeorder.MakeOrderViewModel

class MakeOrderModule(private val core: Core) : Module<MakeOrderViewModel> {
    override fun viewModel(): MakeOrderViewModel {
        return MakeOrderViewModel(
            core.navigation(),
            core.actionDispatcher(),
            core.screenRepository(),
            core.networkRepository()
        )
    }
}

class ProvideMakeOrderViewModel(val core: Core, next: ProvideViewModel) : AbstractProvideViewModel(
    core, next,
    MakeOrderViewModel::class.java
) {
    override fun module(): Module<*> = MakeOrderModule(core)
}