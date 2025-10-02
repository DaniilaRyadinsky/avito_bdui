package github.detrig.composetutorial.presentation.cart.di

import github.detrig.composetutorial.core.Core
import github.detrig.composetutorial.di.AbstractProvideViewModel
import github.detrig.composetutorial.di.Module
import github.detrig.composetutorial.di.ProvideViewModel
import github.detrig.composetutorial.presentation.cart.CartViewModel

class CartModule(private val core: Core) : Module<CartViewModel> {
    override fun viewModel(): CartViewModel {
        return CartViewModel(
            core.navigation(),
            core.navigationHandler(),
            core.screenRepository()
        )
    }
}

class ProvideCartViewModel(val core: Core, next: ProvideViewModel) : AbstractProvideViewModel(
    core, next,
    CartViewModel::class.java
) {
    override fun module(): Module<*> = CartModule(core)
}