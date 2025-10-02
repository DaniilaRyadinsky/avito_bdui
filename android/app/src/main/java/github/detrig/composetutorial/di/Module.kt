package github.detrig.composetutorial.di

import androidx.lifecycle.ViewModel

interface Module<T : ViewModel> {
    fun viewModel(): T
}