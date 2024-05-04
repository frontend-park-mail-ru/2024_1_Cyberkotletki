import { contentService } from '@/api/content/service';
import type { Film } from '@/api/content/types';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import type { AppContext, ContextProps } from '@/types/Context.types';

export interface ContentContextValues {
    films?: Film[];
    film?: Film;
    getAllFilms?: () => Promise<Film[] | undefined>;
    getFilmById?: (id: number) => Promise<Film | undefined>;
}

export const ContentContext = new Context<AppContext>({});

export interface ContentProviderProps extends ContextProps {
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
    };

    render() {
        const { children } = this.props;

        return (
            <ContentContext.Provider
                value={{ content: this.state }}
                context={this.props.context}
            >
                {children}
            </ContentContext.Provider>
        );
    }
}
