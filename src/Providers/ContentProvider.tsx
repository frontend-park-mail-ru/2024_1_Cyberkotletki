import { contentService } from '@/api/content/service';
import type {
    Compilation,
    CompilationType,
    Film,
    FilmsCompilation,
    PersonActor,
} from '@/api/content/types';
import { favouriteService } from '@/api/favourite/favourite.service';
import { reviewService } from '@/api/review/service';
import type { ReviewDetails } from '@/api/review/types';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import type { AppContext } from '@/types/Context.types';
import { convertPreviewToFilm, convertReleaseToFilm } from '@/utils';

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
    compilationTypes?: CompilationType[];
    compilations?: Compilation[];
    nearestReleases?: Film[];
    recentReviews?: ReviewDetails[];
    getAllFilms?: () => Promise<Film[] | undefined>;
    loadFavouriteFilms?: () => Promise<Film[] | undefined>;
    loadFilmById?: (id: number) => Promise<Film | undefined>;
    loadPersonById?: (id: number) => Promise<PersonActor | undefined>;
    loadCollectionFilms: (
        typeId: number,
        page: number,
    ) => Promise<FilmsByCollection>;
    resetFavouriteFilms: () => void;
    loadCompilations?: () => Promise<{
        compilationTypes?: CompilationType[];
        compilations?: Compilation[];
    }>;
    loadNearestReleases: () => Promise<Film[] | undefined>;
    loadRecentReviews: () => Promise<ReviewDetails[] | undefined>;
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

                this.state.filmsMap = filmsMap;

                return film;
            }),

        loadPersonById: (id) =>
            contentService.getPersonById(id).then((person) => {
                const personsMap = { ...this.state.personsMap, [id]: person };

                this.state.personsMap = personsMap;

                return person;
            }),

        loadCollectionFilms: async (typeId: number, page: number) => {
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
            favouriteService.getMyFavourites().then((filmsPreview) => {
                const films = filmsPreview?.map(convertPreviewToFilm);

                this.setState((prev) => ({
                    ...prev,
                    favouriteFilms: films,
                }));

                return films;
            }),

        resetFavouriteFilms: () => {
            this.setState((prev) => ({ ...prev, favouriteFilms: undefined }));
        },

        loadCompilations: () =>
            contentService
                .getCompilationTypes()
                .then(async (compilationsResponse) => {
                    const compilationTypes =
                        compilationsResponse?.compilation_types;

                    const allCompilations = (
                        await Promise.all(
                            compilationsResponse?.compilation_types?.map(
                                (compilation) =>
                                    contentService.getCompilationByTypeId(
                                        compilation.id!,
                                    ),
                            ) ?? [],
                        )
                    ).filter(Boolean);

                    const compilations = allCompilations
                        .map((compilation) => compilation.compilations)
                        .flat()
                        .filter(Boolean);

                    this.state.compilationTypes = compilationTypes;
                    this.state.compilations = compilations;

                    return { compilations, compilationTypes };
                }),
        loadNearestReleases: () =>
            contentService.getNearestReleases().then((response) => {
                const films =
                    response?.ongoing_content_list?.map(convertReleaseToFilm);

                this.state.nearestReleases = films;

                return films;
            }),

        loadRecentReviews: () =>
            reviewService.getRecentReviews().then((response) => {
                this.state.recentReviews = response?.reviews;

                return response?.reviews;
            }),
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
