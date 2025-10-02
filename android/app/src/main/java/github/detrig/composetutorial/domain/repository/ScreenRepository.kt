package github.detrig.composetutorial.domain.repository

interface ScreenRepository {
    suspend fun getScreenJson(id: String): String
}