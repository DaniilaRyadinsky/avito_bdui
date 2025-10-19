package github.detrig.composetutorial.domain.handlers

import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.core.Action
import github.detrig.uikit.core.ActionHandler

class ShowBottomSheetHandler(
    private val state: ScreenState
) : ActionHandler<Action.ShowBottomSheet> {
    override fun canHandle(action: Action): Boolean = action is Action.ShowSnackbar

    override suspend fun handle(action: Action.ShowBottomSheet) {
        state.showSheet(action.targetId)
    }
}