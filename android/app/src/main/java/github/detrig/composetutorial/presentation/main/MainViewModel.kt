package github.detrig.composetutorial.presentation.main

import android.util.Log
import androidx.lifecycle.ViewModel
import github.detrig.composetutorial.presentation.cart.CartScreen
import github.detrig.composetutorial.core.navigation.Navigation
import github.detrig.composetutorial.core.Screen
import github.detrig.composetutorial.domain.handlers.NavigateHandler
import github.detrig.uikit.core.Action
import github.detrig.uikit.core.ActionDispatcher
import kotlinx.coroutines.flow.StateFlow

class MainViewModel(
    private val navigation: Navigation.Mutable,
    private val dispatcher: ActionDispatcher,
) : ViewModel(), Navigation.Read {

    init {
        dispatcher.register(Action.Navigate::class, NavigateHandler(navigation))
        //dispatcher.register(Action.ShowSnackbar::class, ShowSnackbarHandler(screenState))
    }

    fun init(firstRun: Boolean) {
        Log.d("alz-debug", "MainViewModel init, firstRun=$firstRun")
        if (firstRun)
            navigation.update(CartScreen)
    }

    override fun comeback() =
        navigation.comeback()

    override fun screen(): StateFlow<Screen> {
        return navigation.screen()
    }
}