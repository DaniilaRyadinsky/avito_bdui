package github.detrig.composetutorial.core

import github.detrig.composetutorial.data.ScreenRepositoryImpl
import github.detrig.composetutorial.data.ScreenService
import github.detrig.composetutorial.domain.repository.ScreenRepository
import github.detrig.uikit.core.NavigationHandler
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO

interface Core : ProvideNavigation {

    fun screenRepository() : ScreenRepository

    class Base : Core {
        private val navigation: Navigation.Mutable = Navigation.Base()
        private val navigationHandler = NavigationHandlerFromJson(navigation)
        private val screenService = ScreenService.Base(HttpClient(CIO))
        private val screenRepository = ScreenRepositoryImpl(screenService)

        override fun screenRepository(): ScreenRepository = screenRepository

        override fun navigation(): Navigation.Mutable = navigation
        override fun navigationHandler() = navigationHandler

    }
}

interface ProvideNavigation {
    fun navigation(): Navigation.Mutable
    fun navigationHandler() : NavigationHandler
}

