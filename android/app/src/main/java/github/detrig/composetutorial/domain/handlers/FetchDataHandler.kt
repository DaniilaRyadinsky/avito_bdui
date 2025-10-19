package github.detrig.composetutorial.domain.handlers

import android.util.Log
import github.detrig.composetutorial.data.NetworkRepository
import github.detrig.uikit.core.Action
import github.detrig.uikit.core.ActionHandler
import github.detrig.uikit.states.DataState
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject

class FetchDataHandler(
    private val repository: NetworkRepository,
    private val dataState: DataState
) : ActionHandler<Action.FetchData> {

    override fun canHandle(action: Action): Boolean = action is Action.FetchData

    override suspend fun handle(action: Action.FetchData) {
        try {
            val response = repository.fetch(action.endpoint)

            val dataJson = Json.parseToJsonElement(response).jsonObject
            val items = dataJson["items"]?.jsonArray?.map { it.jsonObject } ?: emptyList()

            dataState.setList(action.targetId, items)

        } catch (e: Exception) {
            Log.e("alz-fetch", "Error fetching data from ${action.endpoint}: $e", e)
        }
    }
}
