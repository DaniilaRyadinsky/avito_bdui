package github.detrig.composetutorial.core.navigation

import github.detrig.composetutorial.core.Screen

object NavigationRegistry {
    private val routes = mutableMapOf<String, Screen>()

    fun register(id: String, screen: Screen) {
        routes[id] = screen
    }

    fun resolve(id: String): Screen = routes[id] ?: Screen.Empty
}