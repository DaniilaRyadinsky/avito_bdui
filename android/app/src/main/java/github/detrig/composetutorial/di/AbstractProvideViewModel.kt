package github.detrig.composetutorial.di

import androidx.lifecycle.ViewModel
import github.detrig.composetutorial.core.Core

abstract class AbstractProvideViewModel(
    private val core: Core,
    private val nextChain: ProvideViewModel,
    private val clasz: Class<out ViewModel>
) : ProvideViewModel {

    override fun <T : ViewModel> viewModel(viewModelClass: Class<T>): T {
        return if (viewModelClass == clasz)
            module().viewModel() as T
        else
            nextChain.viewModel(viewModelClass)
    }

    protected abstract fun module(): Module<*>
}