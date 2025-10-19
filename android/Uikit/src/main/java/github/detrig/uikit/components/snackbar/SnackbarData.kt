package github.detrig.uikit.components.snackbar

data class SnackbarData(
    val text: String,
    val actionText: String? = null,
    val duration: Long = 3000,
    val onAction: (() -> Unit)? = null
)