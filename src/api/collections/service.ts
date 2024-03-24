import appFetch from '@/api/applicationFetch.ts';
import { collectionsRoutes } from '@/api/collections/routes.ts';

type GenresResponse = string[];

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
        return appFetch.get(collectionsRoutes.genres()).then((r: Response) => {
            if (r.ok) {
                return r.json().then((data: GenresResponse) => data);
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
            .get(collectionsRoutes.compilation(), { genre })
            .then((r: Response) => {
                if (r.ok) {
                    return r.json().then((data: CompilationResponse) => data);
                }
                throw new Error('Не удалось получить подборку по жанру');
            });
    }
}

export const collectionsService = new CollectionsService();
