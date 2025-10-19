package github.detrig.uikit.components.utils

import github.detrig.uikit.core.Action
import kotlinx.serialization.Polymorphic
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@Polymorphic
abstract class Component {
    @SerialName(value = "_id")
    abstract val id: String?
    abstract val modifier: ModifierModel?
    abstract val actions: List<Action>?
}