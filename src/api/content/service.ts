import appFetch from '@/api/applicationFetch.ts';
import { contentRoutes } from '@/api/content/routes.ts';

interface PreviewContentCard {
    title: string;
    originalTitle: string;
    releaseYear: string;
    country: string;
    genre: string;
    director: string;
    actors: string[];
    poster: string;
    rating: number;
    duration: number;
}

class ContentService {
    /**
     * Получить информацию о фильме в режиме предпросмотра
     * @param id Идентификатор фильма или сериала
     * @returns {Promise<PreviewContentCard>} Информация о фильме
     */
    async getPreviewContentCard(id: number): Promise<PreviewContentCard> {
        return appFetch
            .get(contentRoutes.contentPreview(), { id: id.toString() })
            .then((r: Response) => {
                if (r.ok) {
                    return r.json().then((data: PreviewContentCard) => data);
                }
                throw new Error('Не удалось получить информацию о фильме');
            });
    }
}

export const contentService = new ContentService();
