package github.detrig.uikit.components.snackbar

import github.detrig.uikit.components.utils.Component
import github.detrig.uikit.components.utils.ModifierModel
import github.detrig.uikit.core.Action
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("snackbar")
data class SnackbarComponent(
    override val id: String? = null,
    override val modifier: ModifierModel? = null,
    val text: String,
    val actionText: String? = null,
    val duration: Long = 3000,
    val actions: List<Action>? = null
) : Component()


/**
 * {
 *   "type": "snackbar",
 *   "id": "deleteMessage",
 *   "text": "Товар удалени из корзины",
 *   "actionText": "Вернуть",
 *   "modifier": { "align": "bottomCenter", "padding": { "all": 16 } }
 * }
 */