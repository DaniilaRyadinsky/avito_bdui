package github.detrig.uikit.components.screen

import github.detrig.uikit.components.box.BoxComponent
import github.detrig.uikit.components.button.ButtonComponent
import github.detrig.uikit.components.card.CardComponent
import github.detrig.uikit.components.checkbox.CheckboxComponent
import github.detrig.uikit.components.column.ColumnComponent
import github.detrig.uikit.components.icon.IconComponent
import github.detrig.uikit.components.image.ImageComponent
import github.detrig.uikit.components.row.RowComponent
import github.detrig.uikit.components.spacer.SpacerComponent
import github.detrig.uikit.components.text.TextComponent
import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import github.detrig.uikit.components.bottomsheet.BottomSheetComponent
import github.detrig.uikit.components.snackbar.SnackbarComponent
import github.detrig.uikit.components.textfield.TextFieldComponent
import github.detrig.uikit.components.universal_lazy_list.ListComponent
import kotlinx.serialization.PolymorphicSerializer
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.modules.SerializersModule
import kotlinx.serialization.modules.polymorphic

object ScreenParser {

    val module = SerializersModule {
        polymorphic(Component::class) {
            subclass(TextComponent::class, TextComponent.serializer())
            subclass(ButtonComponent::class, ButtonComponent.serializer())
            subclass(ImageComponent::class, ImageComponent.serializer())
            subclass(TextFieldComponent::class, TextFieldComponent.serializer())
            subclass(BoxComponent::class, BoxComponent.serializer())
            subclass(RowComponent::class, RowComponent.serializer())
            subclass(ColumnComponent::class, ColumnComponent.serializer())
            subclass(CardComponent::class, CardComponent.serializer())
            subclass(CheckboxComponent::class, CheckboxComponent.serializer())
            subclass(SpacerComponent::class, SpacerComponent.serializer())
            subclass(IconComponent::class, IconComponent.serializer())
            subclass(SnackbarComponent::class, SnackbarComponent.serializer())
            subclass(BottomSheetComponent::class, BottomSheetComponent.serializer())
            subclass(ListComponent::class, ListComponent.serializer())
        }
    }

    val json = Json {
        serializersModule = module
        classDiscriminator = "type"
        ignoreUnknownKeys = true
    }

    fun parseComponents(array: JsonArray?): List<Component> {
        return array?.map { elem ->
            json.decodeFromJsonElement(PolymorphicSerializer(Component::class), elem)
        } ?: emptyList()
    }

    fun parse(jsonStr: String): ScreenComponent {
        val jsonObj = json.parseToJsonElement(jsonStr).jsonObject

        val topBar = parseComponents(jsonObj["topBar"]?.jsonArray)
        val bottomBar = parseComponents(jsonObj["bottomBar"]?.jsonArray)
        val snackbars = parseComponents(jsonObj["snackbars"]?.jsonArray)
        val bottomSheets = parseComponents(jsonObj["bottomSheets"]?.jsonArray)
        val content: List<Component> = json.decodeFromJsonElement(
            ListSerializer(PolymorphicSerializer(Component::class)),
            jsonObj["content"]!!
        )

        return ScreenComponent(
            id = jsonObj["_id"]?.jsonPrimitive?.content,
            name = jsonObj["name"]?.jsonPrimitive?.content ?: "UnknownScreen",
            background = jsonObj["background"]?.jsonPrimitive?.content,
            topBar = topBar,
            bottomBar = bottomBar,
            snackbars = snackbars,
            bottomSheets = bottomSheets,
            content = content,
            modifier = jsonObj["modifier"]?.let {
                json.decodeFromJsonElement(ModifierModel.serializer(), it)
            }
        )
    }
}