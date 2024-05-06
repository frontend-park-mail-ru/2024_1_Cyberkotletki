import type {
    CompilationTypesResponse,
    CompilationsResponse,
    Film,
    FilmsCompilation,
    PersonActor,
} from './types';

import { appFetch } from '@/api/appFetch.ts';
import { contentRoutes } from '@/api/content/routes.ts';

export interface PreviewContentCard {
    title: string;
    original_title: string;
    release_year: string;
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
        return appFetch.get<PreviewContentCard>(
            contentRoutes.contentPreview(),
            {
                id: id.toString(),
            },
        );
    }

    /**
     * Получить информацию о фильме в режиме предпросмотра
     * @param id Идентификатор фильма или сериала
     * @returns {Promise<Film | undefined>} Информация о фильме
     */
    async getFilmById(id: number) {
        return appFetch.get<Film | undefined>(contentRoutes.content(id));
    }

    /**
     * Получить информацию о лучших фильмах
     * @returns {Promise<Film[] | undefined>} Информация о фильме
     */
    async getAllFilms() {
        return Promise.all(
            Array.from({ length: 40 }).map((_, id) =>
                appFetch.get<Film | undefined>(contentRoutes.content(id + 1)),
            ),
        );
    }

    /**
     * Получить информацию о персоне
     * @param id Идентификатор персоны
     * @returns {Promise<PersonActor | undefined>} Информация о персоне
     */
    async getPersonById(id: number) {
        return appFetch.get<PersonActor | undefined>(
            contentRoutes.contentPerson(id),
        );
    }

    /**
     * Получение списка подборок
     * @returns Список подборок
     */
    async getCompilationTypes() {
        return appFetch.get<CompilationTypesResponse | undefined>(
            contentRoutes.compilationTypes(),
        );
    }

    /**
     * Получение списка подборок по типу подборок
     * @param id id типа подборки
     * @returns Список подборок
     */
    async getCompilationByTypeId(id: number) {
        return appFetch.get<CompilationsResponse | undefined>(
            contentRoutes.compilationType(id),
        );
    }

    /**
     * Получение карточек контента подборки
     * @param id id подборки
     * @param page номер страницы
     * @returns Список фильмов и/или сериалов
     */
    async getFilmsByCompilationId(id: number, page = 1) {
        return appFetch.get<FilmsCompilation | undefined>(
            contentRoutes.compilation(id, page),
        );
    }
}

export const contentService = new ContentService();
