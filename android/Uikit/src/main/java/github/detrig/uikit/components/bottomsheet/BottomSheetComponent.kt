package github.detrig.uikit.components.bottomsheet

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import github.detrig.uikit.components.row.PolymorphicListSerializer

@Serializable
@SerialName("bottomSheet")
data class BottomSheetComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,

    @Serializable(with = PolymorphicListSerializer::class)
    val children: List<Component> = emptyList(),

    val dismissible: Boolean = true // можно ли закрыть тапом снаружи
) : Component()


/**
 * {
 *   "type": "bottomSheet",
 *   "id": "filterSheet",
 *   "peekHeight": 64,
 *   "expanded": false,
 *   "children": [
 *     { "type": "text", "text": "Фильтры", "style": { "fontSize": 20, "fontWeight": "bold" } },
 *     {
 *       "type": "button",
 *       "id": "applyFiltersBtn",
 *       "text": "Применить",
 *       "actions": [
 *         { "action": "closeBottomSheet", "targetId": "filterSheet" }
 *       ]
 *     }
 *   ]
 * }
 */