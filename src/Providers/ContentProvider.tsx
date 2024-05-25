import { contentService } from '@/api/content/service';
import type { Film, FilmsCompilation, PersonActor } from '@/api/content/types';
import { favouriteService } from '@/api/favourite/favourite.service';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import type { AppContext } from '@/types/Context.types';
import { convertPreviewToFilm } from '@/utils';
import {News} from "@/api/news/types.ts";
import {newsService} from "@/api/news/service.ts";

export interface FilmsByCollection {
    films?: Film[];
    filmsCompilation?: FilmsCompilation;
}

export interface ContentContextValues {
    films?: Film[];
    film?: Film;
    favouriteFilms?: Film[];
    filmsByCollection?: Record<string | number, FilmsByCollection>;
    personsMap: Record<number, PersonActor | undefined>;
    filmsMap: Record<number, Film | undefined>;
    newsMap: Record<number, News | undefined>;
    getAllFilms?: () => Promise<Film[] | undefined>;
    loadFavouriteFilms?: () => Promise<Film[] | undefined>;
    loadFilmById?: (id: number) => Promise<Film | undefined>;
    loadNewsById?: (id: number) => Promise<News | undefined>;
    loadPersonById?: (id: number) => Promise<PersonActor | undefined>;
    loadFilms: (typeId: number, page: number) => Promise<FilmsByCollection>;
    resetFavouriteFilms: () => void;
}

export const ContentContext = new Context<AppContext>({});

export interface ContentProviderProps {
    children?: JSX.Element;
}

export class ContentProvider extends AppComponent<
    ContentProviderProps,
    ContentContextValues
> {
    state: ContentContextValues = {
        filmsMap: {},
        personsMap: {},
        newsMap: {},
        getAllFilms: () =>
            contentService.getAllFilms().then((response) => {
                const films = response.filter(Boolean);

                this.setState((prev) => ({
                    ...prev,
                    films,
                }));

                return films;
            }),

        loadFilmById: (id) =>
            contentService.getFilmById(id).then((film) => {
                const filmsMap = { ...this.state.filmsMap, [id]: film };

                this.setState((prev) => ({
                    ...prev,
                    film,
                    filmsMap,
                }));

                return film;
            }),

        loadNewsById: (id) =>
            newsService.getNewsById(id).then((news) => {
                console.log('News loaded:', news);
                const newsMap = { ...this.state.newsMap, [id]: news };

                this.setState((prev) => ({
                    ...prev,
                    news,
                    newsMap,
                }));

                return news;
            }).catch((error) => {
                console.log('Error loading news:', error);
                return undefined; // Explicitly return undefined
            }),

        loadPersonById: (id) =>
            contentService.getPersonById(id).then((person) => {
                const personsMap = { ...this.state.personsMap, [id]: person };

                this.setState((prev) => ({
                    ...prev,
                    personsMap,
                }));

                return person;
            }),

        loadFilms: async (typeId: number, page: number) => {
            const filmsCompilation =
                await contentService.getFilmsByCompilationId(typeId, page);

            const films =
                filmsCompilation?.content?.map(convertPreviewToFilm) ?? [];

            const filmsByCollection = this.state.filmsByCollection ?? {};

            const stateFilms = this.state.filmsByCollection?.[typeId];

            filmsByCollection[typeId] = {
                filmsCompilation,
                films: [...(stateFilms?.films ?? []), ...films],
            };

            this.setState((prev) => ({
                ...prev,
                filmsByCollection: { ...filmsByCollection },
            }));

            return filmsByCollection[typeId];
        },

        loadFavouriteFilms: () =>
            favouriteService.getMyFavourites().then((films) => {
                this.setState((prev) => ({
                    ...prev,
                    favouriteFilms: films,
                }));

                return films;
            }),

        resetFavouriteFilms: () => {
            this.setState((prev) => ({ ...prev, favouriteFilms: undefined }));
        },
    };

    render() {
        const { children } = this.props;

        return (
            <ContentContext.Provider value={{ content: this.state }}>
                {children}
            </ContentContext.Provider>
        );
    }
}
