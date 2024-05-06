import styles from './CollectionsDetailsPage.module.scss';

import { ContentContext } from '@/Providers/ContentProvider';
import type { Film, FilmsCompilation } from '@/api/content/types';
import { Button } from '@/components/Button';
import { FilmCard } from '@/components/FilmCard';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses } from '@/utils';
import type { AppContext } from '@/types/Context.types';
import { NotFound } from '@/components/NotFound';

const cx = concatClasses.bind(styles);

export interface CollectionsDetailsPageState {
    films: Film[] | null;
    filmsCompilation?: FilmsCompilation;
    currentPage?: number;
    isLoading: boolean;
    error?: unknown;
}

export interface CollectionsDetailsPageProps {
    context?: AppContext;
}

class CollectionsDetailsPageClass extends AppComponent<
    CollectionsDetailsPageProps,
    CollectionsDetailsPageState
> {
    state: CollectionsDetailsPageState = { isLoading: false, films: null };

    handlePageChange = (page: number) => {
        const { params } = window.history.state as {
            params?: { uid?: string };
        };

        this.setState((prev) => ({ ...prev, isLoading: true }));

        void this.props.context?.content
            ?.loadFilms(Number(params?.uid), page)
            .then((data) => {
                this.setState((prev) => ({
                    ...prev,
                    films: data.films ?? [],
                    currentPage: data.filmsCompilation?.page,
                    filmsCompilation: data.filmsCompilation,
                }));
            })
            .catch((error: unknown) => {
                this.setState((prev) => ({
                    ...prev,
                    error,
                    films: [],
                }));
            })
            .finally(() => {
                this.setState((prev) => ({ ...prev, isLoading: false }));
            });
    };

    render(): AppNode {
        const { params } = window.history.state as {
            params?: { uid?: string };
        };

        const filmsByCollection =
            this.props.context?.content?.filmsByCollection?.[
                Number(params?.uid)
            ];

        const filmsCompilation =
            this.state.filmsCompilation ?? filmsByCollection?.filmsCompilation;

        const currentPage =
            this.state.currentPage ??
            filmsByCollection?.filmsCompilation?.page ??
            0;

        const films = this.state.films ?? filmsByCollection?.films ?? null;

        if (films === null && !this.state.isLoading) {
            this.handlePageChange(1);
        }

        return (
            <LayoutWithHeader>
                {this.state.error ? (
                    <NotFound description="Подборка не найдена" />
                ) : (
                    <section>
                        <h1 className={cx('head')}>Подборки</h1>
                        <div className={cx('grid-container')}>
                            {films?.map((film) => <FilmCard film={film} />)}
                        </div>
                        {currentPage < (filmsCompilation?.total_pages ?? 0) && (
                            <Button
                                onClick={() => {
                                    void this.handlePageChange(
                                        (currentPage ?? 0) + 1,
                                    );
                                }}
                                isLoading={this.state.isLoading}
                                outlined
                                styleType="secondary"
                                className={cx('more-button')}
                            >
                                Показать еще
                            </Button>
                        )}
                        <pre>{JSON.stringify(filmsCompilation, null, 4)}</pre>
                        <pre>{JSON.stringify(films, null, 4)}</pre>
                    </section>
                )}
            </LayoutWithHeader>
        );
    }
}

export const CollectionsDetailsPage = ContentContext.Connect(
    CollectionsDetailsPageClass,
);
