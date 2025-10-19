package github.detrig.uikit.core

interface ActionHandler<T : Action> {
    fun canHandle(action: Action): Boolean
    suspend fun handle(action: T)
}
