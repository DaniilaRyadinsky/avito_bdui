package github.detrig.composetutorial.domain.handlers

import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.core.Action
import github.detrig.uikit.core.ActionHandler

class ShowSnackbarHandler(
    private val state: ScreenState
) : ActionHandler<Action.ShowSnackbar> {
    override fun canHandle(action: Action): Boolean = action is Action.ShowSnackbar

    override suspend fun handle(action: Action.ShowSnackbar) {
        state.showSnackbar(action.targetId)
    }
}