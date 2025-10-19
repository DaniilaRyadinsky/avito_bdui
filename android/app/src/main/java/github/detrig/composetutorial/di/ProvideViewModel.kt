package github.detrig.composetutorial.di

import androidx.lifecycle.ViewModel
import github.detrig.composetutorial.core.Core
import github.detrig.composetutorial.presentation.cart.di.ProvideCartViewModel
import github.detrig.composetutorial.presentation.main.di.ProvideMainViewModel
import github.detrig.composetutorial.presentation.makeorder.di.ProvideMakeOrderViewModel
import github.detrig.composetutorial.presentation.shippingmethod.di.ProvideShippingMethodViewModel


interface ProvideViewModel {

    fun <T : ViewModel> viewModel(viewModelClass: Class<T>): T

    class Base(
        core: Core
    ) : ProvideViewModel {

        private lateinit var chain: ProvideViewModel

        init {
            chain = ProvideViewModel.Error()
            chain = ProvideMainViewModel(core, chain)
            chain = ProvideCartViewModel(core, chain)
            chain = ProvideMakeOrderViewModel(core, chain)
            chain = ProvideShippingMethodViewModel(core, chain)
        }

        override fun <T : ViewModel> viewModel(viewModelClass: Class<T>): T {
            return chain.viewModel(viewModelClass)
        }
    }

    class Error : ProvideViewModel {
        override fun <T : ViewModel> viewModel(viewModelClass: Class<T>): T {
            throw IllegalStateException("unknown viewModelClass $viewModelClass")
        }
    }
}