package github.detrig.composetutorial.data

import android.util.Log
import io.ktor.client.HttpClient
import io.ktor.client.request.get
import io.ktor.client.statement.bodyAsText

interface NetworkService {
    suspend fun fetchData(address: String): String

    class Base(private val client: HttpClient) : NetworkService {
        override suspend fun fetchData(address: String): String {
            val response = client.get(address)
            return response.bodyAsText()
        }
    }
}
