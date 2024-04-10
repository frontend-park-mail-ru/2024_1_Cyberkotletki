import { FilmMainContent } from './FilmMainContent';

import { ResponseError } from '@/api/appFetch';
import { contentService } from '@/api/content/service';
import type { Film } from '@/api/content/types';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { isDefined } from '@/utils';
import { ResponseStatus } from '@/shared/constants';
import { NotFound } from '@/components/NotFound';

export interface FilmPageState {
    film?: Film;
    isNotFound?: boolean;
}

export class FilmPage extends AppComponent<object, FilmPageState> {
    componentDidMount(): void {
        const { params } = window.history.state as {
            params?: { uid?: string };
        };

        if (isDefined(params?.uid)) {
            void contentService
                .getFilmById(+params.uid)
                .then((film) => {
                    this.setState((prev) => ({ ...prev, film }));
                })
                .catch((error) => {
                    if (
                        error instanceof ResponseError &&
                        error.statusCode === ResponseStatus.NOT_FOUND
                    ) {
                        this.setState((prev) => ({
                            ...prev,
                            isNotFound: true,
                        }));
                    }
                });
        }
    }

    render(): AppNode {
        return (
            <LayoutWithHeader>
                {this.state.isNotFound ? (
                    <NotFound description="Фильм не найден" />
                ) : (
                    <FilmMainContent film={this.state.film} />
                )}
                <pre>{JSON.stringify(this.state.film, null, 2)}</pre>
            </LayoutWithHeader>
        );
    }
}
