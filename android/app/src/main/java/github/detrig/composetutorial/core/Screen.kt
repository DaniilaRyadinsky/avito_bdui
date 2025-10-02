package github.detrig.composetutorial.core

import androidx.compose.runtime.Composable

interface Screen {

    @Composable
    fun Show()

    object Empty: Screen {
        @Composable
        override fun Show() = Unit
    }

}