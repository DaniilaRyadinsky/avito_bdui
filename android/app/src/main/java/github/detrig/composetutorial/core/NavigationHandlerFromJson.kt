package github.detrig.composetutorial.core

import github.detrig.composetutorial.presentation.cart.CartScreen
import github.detrig.composetutorial.presentation.makeorder.MakeOrderScreen
import github.detrig.uikit.core.NavigationHandler
import android.util.Log

class NavigationHandlerFromJson(private val navigation: Navigation.Mutable) : NavigationHandler {
    override fun navigateTo(screenId: String) {
        val screen: Screen = when(screenId) {
            "cart" -> CartScreen
            "make_order" -> MakeOrderScreen
            else -> Screen.Empty
        }
        navigation.update(screen)
    }
}