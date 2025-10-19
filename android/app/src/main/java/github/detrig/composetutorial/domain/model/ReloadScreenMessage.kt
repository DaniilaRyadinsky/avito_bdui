package github.detrig.composetutorial.domain.model

import kotlinx.serialization.*

@Serializable
data class ReloadScreenMessage(
    val type: String,
    val data: ScreenData
)

@Serializable
data class ScreenData(
    val id: String,
    val ts: Long
)
