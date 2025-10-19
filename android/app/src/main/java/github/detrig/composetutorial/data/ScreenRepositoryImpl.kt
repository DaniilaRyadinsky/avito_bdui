package github.detrig.composetutorial.data

import github.detrig.composetutorial.domain.repository.ScreenRepository
import kotlinx.coroutines.flow.Flow

class ScreenRepositoryImpl(
    private val service: ScreenService
) : ScreenRepository {
    override suspend fun getScreenJson(id: String): String {
        val json = service.fetchScreenJson(id)
        return json
    }

    override fun observeScreen(id: String): Flow<String> =
        service.observeScreen(id)
}