package github.detrig.uikit.core

import github.detrig.uikit.components.screen.ScreenParser
import github.detrig.uikit.components.utils.Component
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.jsonObject

object DataBinder {

    /**
     * Подставляет данные из data в компонент, рекурсивно обходя всех детей
     */
    fun bindData(component: Component, data: JsonObject): Component {
        val jsonElement = ScreenParser.json.encodeToJsonElement(Component.serializer(), component).jsonObject
        val substituted = substituteInJson(jsonElement, data)
        return ScreenParser.json.decodeFromJsonElement(Component.serializer(), substituted)
    }

    private fun substituteInJson(element: JsonElement, data: JsonObject): JsonElement {
        return when (element) {
            is JsonObject -> JsonObject(
                element.mapValues { (_, v) -> substituteInJson(v, data) }
            )
            is JsonArray -> JsonArray(element.map { substituteInJson(it, data) })
            is JsonPrimitive -> {
                if (element.isString && element.content.startsWith("$")) {
                    val key = element.content.removePrefix("$")
                    data[key] ?: JsonPrimitive("")
                } else element
            }
            else -> element
        }
    }
}