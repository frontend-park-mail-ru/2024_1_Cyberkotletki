import { favoriteRoutes } from './favourite.routes';
import type {
    FavouriteBody,
    FavouriteResponse,
    FavouriteStatus,
} from './favourite.types';

import { appFetch } from '@/api/appFetch.ts';

class FavouriteService {
    /**
     * Добавление в избранное. Если уже в избранном,
     * то ошибка не возвращается (идемпотентный метод).
     * @param id id фильма
     * @returns Ответ
     */
    async addToFavourite(id: string | number) {
        return appFetch.put<FavouriteBody, unknown>(
            favoriteRoutes.favourite(),
            { contentID: +id, category: 'favourite' },
        );
    }

    /**
     * Получение избранного пользователя
     * @returns Список фильмов и/или сериалов или персон
     */
    async getMyFavourites() {
        const favourites = await appFetch.get<FavouriteResponse>(
            favoriteRoutes.favouriteMy(),
        );

        return favourites.favourites
            ?.map(({ content }) => content)
            .filter(Boolean);
    }

    /**
     * Получение статуса контента в избранном
     * @param id Идентификатор контента
     * @returns Возвращает статус контента в избранном
     */
    async getContentFavouriteStatus(id: string | number) {
        return appFetch.get<FavouriteStatus>(
            favoriteRoutes.favouriteStatus(id),
        );
    }

    /**
     * Получение избранного пользователя
     * @param id Идентификатор пользователя
     * @returns Возвращает статус контента в избранном
     */
    async getProfileFavourites(id: string | number) {
        return appFetch.get<FavouriteResponse>(favoriteRoutes.favourite(id));
    }

    /**
     * Удаление из избранного.
     * @param id Идентификатор контента
     * @returns Ответ
     */
    async deleteFavouriteContent(id: string | number) {
        return appFetch.delete(favoriteRoutes.favourite(id));
    }
}

export const favouriteService = new FavouriteService();
