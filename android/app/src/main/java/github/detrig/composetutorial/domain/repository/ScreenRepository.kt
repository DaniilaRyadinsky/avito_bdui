package github.detrig.composetutorial.domain.repository

import kotlinx.coroutines.flow.Flow

interface ScreenRepository {
    suspend fun getScreenJson(id: String): String
    fun observeScreen(id: String): Flow<String>
}