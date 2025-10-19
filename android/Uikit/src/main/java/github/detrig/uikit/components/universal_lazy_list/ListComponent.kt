package github.detrig.uikit.components.universal_lazy_list

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import github.detrig.uikit.core.Action
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject

@Serializable
@SerialName("list")
data class ListComponent(
    @SerialName("_id")
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
    override val actions: List<Action>? = null,

    @SerialName("children")
    val template: List<JsonObject>
) : Component()
