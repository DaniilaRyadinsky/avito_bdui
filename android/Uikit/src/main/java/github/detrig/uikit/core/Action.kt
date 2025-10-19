package github.detrig.uikit.core

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
sealed class Action {
    abstract val event: ActionEvent

    @Serializable
    @SerialName("navigate")
    data class Navigate(
        override val event: ActionEvent,
        val targetId: String
    ) : Action()

    @Serializable
    @SerialName("showSnackbar")
    data class ShowSnackbar(
        override val event: ActionEvent,
        val targetId: String
    ) : Action()

    @Serializable
    @SerialName("showBottomSheet")
    data class ShowBottomSheet(
        override val event: ActionEvent,
        val targetId: String
    ) : Action()

    @Serializable
    @SerialName("fetch_data")
    data class FetchData(
        override val event: ActionEvent,
        val endpoint: String,
        val targetId: String
    ) : Action()

    @Serializable
    @SerialName("set_value")
    data class SetValue(
        override val event: ActionEvent,
        val targetId: String,
        val value: String
    ) : Action()
}

@Serializable
enum class ActionEvent {
    @SerialName("onClick")
    OnClick,

    @SerialName("onScreenInitialized")
    OnScreenInitialized,

    @SerialName("onLongClick")
    OnLongClick,

    @SerialName("onValueChange")
    OnValueChange
}

//@Serializable
//data class Action(
//    val type: String,          // тип действия: "navigate", "show_toast" и т.д.
//    val event: String,         // тип события: "onClick", "onLongClick"
//    val targetId: String? = null,
//    val value: String? = null
//)