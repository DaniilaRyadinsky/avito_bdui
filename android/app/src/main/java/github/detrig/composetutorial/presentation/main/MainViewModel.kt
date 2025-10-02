package github.detrig.composetutorial.presentation.main

import androidx.lifecycle.ViewModel
import github.detrig.composetutorial.presentation.cart.CartScreen
import github.detrig.composetutorial.core.Navigation
import github.detrig.composetutorial.core.Screen
import kotlinx.coroutines.flow.StateFlow

class MainViewModel(
    private val navigation: Navigation.Mutable
) : ViewModel(), Navigation.Read {

    fun init(firstRun: Boolean) {
        if (firstRun)
            navigation.update(CartScreen)
    }

    override fun comeback() =
        navigation.comeback()


    override fun screen(): StateFlow<Screen> {
        return navigation.screen()
    }
}