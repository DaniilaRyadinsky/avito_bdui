package github.detrig.uikit.core

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
import github.detrig.uikit.components.screen.ScreenState
import github.detrig.uikit.components.text.TextComponent
import github.detrig.uikit.components.text.TextRenderer
import github.detrig.uikit.components.utils.Component
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.jsonPrimitive


object RenderComponent {

    @Composable
    fun Render(
        component: Component,
        state: ScreenState,
        dispatcher: ActionDispatcher
    ) {
        when (component) {
            is TextComponent -> TextRenderer.Render(component, state)
            is ButtonComponent -> ButtonRenderer.Render(component, state, dispatcher)
            is ImageComponent -> ImageRenderer.Render(component, state)
            is RowComponent -> RowRenderer.Render(component, state, dispatcher)
            is ColumnComponent -> ColumnRenderer.Render(component, state, dispatcher)
            is CheckboxComponent -> CheckboxRenderer.Render(component, state)
            is CardComponent -> CardRenderer.Render(component, state, dispatcher)
            is BoxComponent -> BoxRenderer.Render(component, state, dispatcher)
            is IconComponent -> IconRenderer.Render(component, state, dispatcher)
            else -> {}
        }
    }

    @Composable
    fun RenderWithData(
        component: Component?,
        state: ScreenState,
        dispatcher: ActionDispatcher,
        itemData: JsonObject
    ) {
        if (component == null) return

        val filledComponent = applyDataToComponent(component, itemData)
        Render(filledComponent, state, dispatcher)
    }

    private fun applyDataToComponent(component: Component, itemData: JsonObject): Component {
        return when (component) {
            is TextComponent -> component.copy(
                text = component.text?.replacePlaceholders(itemData)
            )
            is ImageComponent -> component.copy(
                url = component.url?.replacePlaceholders(itemData)
            )
            is CheckboxComponent -> component.copy(
                isChecked = itemData[component.id ?: ""]?.jsonPrimitive?.booleanOrNull ?: component.isChecked
            )
            is ColumnComponent -> component.copy(
                children = component.children.map { applyDataToComponent(it, itemData) }
            )
            is RowComponent -> component.copy(
                children = component.children.map { applyDataToComponent(it, itemData) }
            )
            is BoxComponent -> component.copy(
                children = component.children.map { applyDataToComponent(it, itemData) }
            )
            is CardComponent -> component.copy(
                children = component.children.map { applyDataToComponent(it, itemData) }
            )
            else -> component
        }
    }

    private fun String.replacePlaceholders(itemData: JsonObject): String {
        var result = this
        itemData.forEach { (key, value) ->
            result = result.replace("{$key}", value.jsonPrimitive.content)
        }
        return result
    }
}