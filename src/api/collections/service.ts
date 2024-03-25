import appFetch, { ResponseStatus } from '@/api/applicationFetch.ts';
import { collectionsRoutes } from '@/api/collections/routes.ts';

interface GenresResponse {
    genres: string[];
}

interface CompilationResponse {
    genre: string;
    ids: number[];
}

class CollectionsService {
    /**
     * Получить список жанров
     * @returns {Promise<GenresResponse>} Список жанров
     */
    async getGenres(): Promise<GenresResponse> {
        return appFetch
            .get<GenresResponse>(collectionsRoutes.genres())
            .then(async (response) => {
                if (response.status === ResponseStatus.OK) {
                    return response.data.then((data: GenresResponse) => data);
                }
                throw new Error('Не удалось получить список жанров');
            });
    }

    /**
     * Получить подборку по жанру
     * @param genre Жанр, для которого нужно получить подборку
     * @returns {Promise<CompilationResponse>} Список жанров
     */
    async getCompilation(genre: string): Promise<CompilationResponse> {
        return appFetch
            .get<CompilationResponse>(collectionsRoutes.compilation(), {
                genre,
            })
            .then(async (response) => {
                if (response.status === ResponseStatus.OK) {
                    return response.data.then(
                        (data: CompilationResponse) => data,
                    );
                }
                throw new Error('Не удалось получить подборку по жанру');
            });
    }
}

export const collectionsService = new CollectionsService();
