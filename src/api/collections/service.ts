import { appFetch } from '@/api/appFetch.ts';
import { collectionsRoutes } from '@/api/collections/routes.ts';

interface GenresResponse {
    genres: string[];
}

export interface CompilationResponse {
    genre: string;
    ids: number[];
}
export type FilmsGenre = 'action' | 'comedian' | 'drama';

class CollectionsService {
    /**
     * Получить список жанров
     * @returns {Promise<GenresResponse>} Список жанров
     */
    async getGenres(): Promise<GenresResponse> {
        return appFetch.get<GenresResponse>(collectionsRoutes.genres());
    }

    /**
     * Получить подборку по жанру
     * @param genre Жанр, для которого нужно получить подборку
     * @returns {Promise<CompilationResponse>} Список жанров
     */
    async getCompilation(genre: FilmsGenre): Promise<CompilationResponse> {
        return appFetch.get<CompilationResponse>(
            `${collectionsRoutes.compilation()}`,
            { genre },
        );
    }
}

export const collectionsService = new CollectionsService();
