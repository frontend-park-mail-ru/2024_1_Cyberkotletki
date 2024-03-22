import { appFetch } from '../appFetch.js';

import { filmsRoutes } from './films.routes.js';

class FilmsService {
    /**
     * Возвращает фильмы по жанру (?наверно)
     * @param {string} genre Жанр
     * @returns {Promise} фильмы по жанру
     */
    getFilmsIdsByGenre(genre) {
        // await - ожидаем ответа от сервера
        return appFetch(filmsRoutes.collectionsByGenre(genre), {}, true);
    }

    /**
     * Возвращает фильмы по id
     * @param {string} id id
     * @returns {Promise} фильм
     */
    getFilm(id) {
        // await - ожидаем ответа от сервера
        return appFetch(filmsRoutes.contentPreview(id), {}, true);
    }
}

export const filmService = new FilmsService();
