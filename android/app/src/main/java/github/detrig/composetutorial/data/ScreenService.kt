package github.detrig.composetutorial.data

import android.util.Log
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.plugins.websocket.webSocket
import io.ktor.client.request.get
import io.ktor.client.request.parameter
import io.ktor.http.HttpMethod
import io.ktor.websocket.Frame
import io.ktor.websocket.readReason
import io.ktor.websocket.readText
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow

interface ScreenService {
    suspend fun fetchScreenJson(id: String): String
    fun observeScreen(id: String): Flow<String>

    class Base(private val client: HttpClient) : ScreenService {

        override suspend fun fetchScreenJson(id: String): String {
            val response = client.get("http://31.56.205.210:8080/api/screen/get") {
                parameter("id", id)
            }
            val body = response.body<String>()
            return body
        }

        override fun observeScreen(id: String): Flow<String> = callbackFlow {

            try {
                client.webSocket(
                    method = HttpMethod.Get,
                    host = "31.56.205.210",
                    port = 8080,
                    path = "/ws",
                ) {
                    for (frame in incoming) {
                        when (frame) {
                            is Frame.Text -> {
                                val update = frame.readText()
                                trySend(update)
                            }
                            is Frame.Close -> {
                                break
                            }
                            else -> Unit
                        }
                    }
                }
            } catch (e: Exception) {
                Log.e("alz-debug", "Error WebSocket: ${e.message}")
            }

            awaitClose {
                Log.d("alz-debug", "WebSocket is close locally for id=$id")
            }
        }
    }
}