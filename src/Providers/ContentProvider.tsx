import { contentService } from '@/api/content/service';
import type { Film, FilmsCompilation } from '@/api/content/types';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import type { AppContext } from '@/types/Context.types';

export interface FilmsByCollection {
    films?: Film[];
    filmsCompilation?: FilmsCompilation;
}

export interface ContentContextValues {
    films?: Film[];
    film?: Film;
    filmsByCollection?: Record<string | number, FilmsByCollection>;
    getAllFilms?: () => Promise<Film[] | undefined>;
    getFilmById?: (id: number) => Promise<Film | undefined>;
    loadFilms: (typeId: number, page: number) => Promise<FilmsByCollection>;
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
        getAllFilms: () =>
            contentService.getAllFilms().then((response) => {
                const films = response.filter(Boolean) as Film[];

                this.setState((prev) => ({
                    ...prev,
                    films,
                }));

                return films;
            }),

        getFilmById: (id) =>
            contentService.getFilmById(id).then((film) => {
                this.setState((prev) => ({
                    ...prev,
                    film,
                }));

                return film;
            }),

        loadFilms: async (typeId: number, page: number) => {
            const filmsCompilation =
                await contentService.getFilmsByCompilationId(typeId, page);

            const films = (
                await Promise.all(
                    filmsCompilation?.content_ids?.map((id) =>
                        contentService.getFilmById(id),
                    ) ?? [],
                )
            ).filter(Boolean) as Film[];

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
