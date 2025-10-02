package github.detrig.uikit.core

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

//@Serializable
//sealed class Action {
//    @Serializable
//    @SerialName("navigate")
//    data class Navigate(val screenId: String) : Action()
//
//    @Serializable
//    @SerialName("open_url")
//    data class OpenUrl(val url: String) : Action()
//
//    @Serializable
//    @SerialName("back")
//    object Back : Action()
//
//    @Serializable
//    @SerialName("track_event")
//    data class TrackEvent(val name: String, val params: Map<String, String>? = null) : Action()
//}

@Serializable
data class Action(
    val action: String,
    val targetId: String? = null,
    val value: String? = null
)