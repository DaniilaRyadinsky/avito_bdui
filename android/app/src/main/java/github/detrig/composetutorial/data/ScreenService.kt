package github.detrig.composetutorial.data

import android.util.Log
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.parameter

interface ScreenService {
    suspend fun fetchScreenJson(id: String): String

    class Base(private val client: HttpClient) : ScreenService {
        override suspend fun fetchScreenJson(id: String): String {
            val response = client.get("http://31.56.205.210:8080/api/screen/get") {
                parameter("id", id)
            }
            val body = response.body<String>()
            Log.d("alz-04", "body: ${body}")
            return body
        }
    }
}