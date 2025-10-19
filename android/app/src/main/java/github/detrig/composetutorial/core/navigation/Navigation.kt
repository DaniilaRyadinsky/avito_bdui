package github.detrig.composetutorial.core.navigation

import android.util.Log
import github.detrig.composetutorial.core.Screen
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

interface Navigation {

    interface Read {
        fun screen(): StateFlow<Screen>
        fun comeback(): Boolean
    }

    interface Update {
        fun update(screen: Screen)
    }

    interface Mutable : Read, Update

    class Base(
        private val list: ArrayList<Screen> = ArrayList(),
        private val state: MutableStateFlow<Screen> = MutableStateFlow<Screen>(Screen.Empty)
    ) : Mutable {
        override fun screen(): StateFlow<Screen> = state

        override fun comeback() : Boolean {
            val canComeback = list.isNotEmpty()
            if (canComeback) {
                list.removeAt(list.size - 1)
                state.value = list.last()
            }
            return canComeback
        }

        override fun update(screen: Screen) {
            list.add(screen)
            state.value = screen
        }

    }
}
