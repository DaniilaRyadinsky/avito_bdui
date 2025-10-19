package github.detrig.composetutorial.presentation.shippingmethod.di

import github.detrig.composetutorial.core.Core
import github.detrig.composetutorial.di.AbstractProvideViewModel
import github.detrig.composetutorial.di.Module
import github.detrig.composetutorial.di.ProvideViewModel
import github.detrig.composetutorial.presentation.shippingmethod.ShippingMethodViewModel

class ShippingMethodModule(private val core: Core) : Module<ShippingMethodViewModel> {
    override fun viewModel(): ShippingMethodViewModel {
        return ShippingMethodViewModel(
            core.navigation(),
            core.actionDispatcher(),
            core.screenRepository(),
            core.networkRepository()
        )
    }
}

class ProvideShippingMethodViewModel(val core: Core, next: ProvideViewModel) : AbstractProvideViewModel(
    core, next,
    ShippingMethodViewModel::class.java
) {
    override fun module(): Module<*> = ShippingMethodModule(core)
}