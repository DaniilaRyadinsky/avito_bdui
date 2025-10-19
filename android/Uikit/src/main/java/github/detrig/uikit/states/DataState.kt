package github.detrig.uikit.states

import android.util.Log
import androidx.compose.runtime.mutableStateMapOf
import kotlinx.serialization.json.JsonObject

class DataState {
    private val dataMap = mutableStateMapOf<String, List<JsonObject>>()

    fun getList(key: String): List<JsonObject>? = dataMap[key]
    fun setList(key: String, list: List<JsonObject>) {
        dataMap[key] = list
    }
}