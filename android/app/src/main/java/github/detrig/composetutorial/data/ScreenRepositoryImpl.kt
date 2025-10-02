package github.detrig.composetutorial.data

import github.detrig.composetutorial.domain.repository.ScreenRepository

class ScreenRepositoryImpl(
    private val service: ScreenService
) : ScreenRepository {
    override suspend fun getScreenJson(id: String): String {
        val json = service.fetchScreenJson(id)
        return json
    }
}