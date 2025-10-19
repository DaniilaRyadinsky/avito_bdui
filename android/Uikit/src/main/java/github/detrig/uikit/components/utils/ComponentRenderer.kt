package github.detrig.uikit.components.utils

import androidx.compose.runtime.Composable
import github.detrig.uikit.components.box.BoxComponent
import github.detrig.uikit.components.box.BoxRenderer
import github.detrig.uikit.components.checkbox.CheckboxComponent
import github.detrig.uikit.components.button.ButtonComponent
import github.detrig.uikit.components.button.ButtonRenderer
import github.detrig.uikit.components.card.CardComponent
import github.detrig.uikit.components.card.CardRenderer
import github.detrig.uikit.components.checkbox.CheckboxRenderer
import github.detrig.uikit.components.column.ColumnComponent
import github.detrig.uikit.components.column.ColumnRenderer
import github.detrig.uikit.components.icon.IconComponent
import github.detrig.uikit.components.icon.IconRenderer
import github.detrig.uikit.components.image.ImageComponent
import github.detrig.uikit.components.image.ImageRenderer
import github.detrig.uikit.components.row.RowComponent
import github.detrig.uikit.components.row.RowRenderer
import github.detrig.uikit.states.ScreenState
import github.detrig.uikit.components.text.TextComponent
import github.detrig.uikit.components.text.TextRenderer
import github.detrig.uikit.components.textfield.TextFieldComponent
import github.detrig.uikit.components.textfield.TextFieldRenderer
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.uikit.components.universal_lazy_list.ListComponent
import github.detrig.uikit.components.universal_lazy_list.ListRenderer
import github.detrig.uikit.states.DataState

object ComponentRenderer {

    @Composable
    fun Render(component: Component, state: ScreenState, dataState: DataState, dispatcher: ActionDispatcher) {
        when (component) {
            is TextComponent -> TextRenderer.Render(component, dispatcher, state)
            is ButtonComponent -> ButtonRenderer.Render(component, state, dispatcher)
            is ImageComponent -> ImageRenderer.Render(component, state, dispatcher)
            is TextFieldComponent -> TextFieldRenderer.Render(component, state, dispatcher)
            is RowComponent -> RowRenderer.Render(component, state, dataState, dispatcher)
            is ColumnComponent -> ColumnRenderer.Render(component, state, dataState, dispatcher)
            is CheckboxComponent -> CheckboxRenderer.Render(component, dispatcher, state)
            is CardComponent -> CardRenderer.Render(component, state, dataState, dispatcher)
            is BoxComponent -> BoxRenderer.Render(component, state, dispatcher)
            is IconComponent -> IconRenderer.Render(component, state, dispatcher)
            is ListComponent -> ListRenderer.Render(component, state, dataState, dispatcher)
            else -> {}
        }
    }
}
