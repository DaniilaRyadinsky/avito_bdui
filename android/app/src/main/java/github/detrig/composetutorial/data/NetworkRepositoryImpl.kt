package github.detrig.composetutorial.data

interface NetworkRepository {
    suspend fun fetch(endpoint: String): String
}

class NetworkRepositoryImpl(
    private val service: NetworkService
) : NetworkRepository {
    override suspend fun fetch(endpoint: String): String {
        return service.fetchData(endpoint)
    }
}