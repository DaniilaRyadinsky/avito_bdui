package github.detrig.uikit.components.screen

import github.detrig.uikit.components.snackbar.SnackbarComponent
import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import github.detrig.uikit.core.Action
import kotlinx.serialization.Polymorphic
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("screen")
data class ScreenComponent(
    @SerialName("_id")
    override val id: String?,
    override val modifier: ModifierModel?,
    override val actions: List<Action>? = null,
    val name: String,
    val background: String? = null,
    @Polymorphic val topBar: List<Component> = emptyList(),
    @Polymorphic val content: List<Component> = emptyList(),
    @Polymorphic val bottomBar: List<Component> = emptyList(),
    @Polymorphic val snackbars: List<Component> = emptyList(),
    @Polymorphic val bottomSheets: List<Component> = emptyList()
) : Component()