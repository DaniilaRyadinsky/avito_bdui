package github.detrig.composetutorial.domain.handlers

import github.detrig.composetutorial.core.navigation.Navigation
import github.detrig.composetutorial.core.Screen
import github.detrig.composetutorial.presentation.cart.CartScreen
import github.detrig.composetutorial.presentation.makeorder.MakeOrderScreen
import github.detrig.uikit.core.Action
import github.detrig.uikit.core.ActionHandler

class NavigateHandler(
    private val navigation: Navigation.Mutable
) : ActionHandler<Action.Navigate> {
    override fun canHandle(action: Action): Boolean = action is Action.Navigate

    override suspend fun handle(action: Action.Navigate) {
        navigation.update(
            when (action.targetId) {
                CartScreen.SCREEN_ID -> CartScreen
                MakeOrderScreen.SCREEN_ID -> MakeOrderScreen
                else -> Screen.Empty
            }
        )
    }
}