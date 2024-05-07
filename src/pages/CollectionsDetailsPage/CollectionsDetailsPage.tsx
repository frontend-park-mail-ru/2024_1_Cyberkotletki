import styles from './CollectionsDetailsPage.module.scss';

import { ContentContext } from '@/Providers/ContentProvider';
import type { Film, FilmsCompilation } from '@/api/content/types';
import { Button } from '@/components/Button';
import { FilmCard } from '@/components/FilmCard';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses, getStaticUrl } from '@/utils';
import type { AppContext } from '@/types/Context.types';
import { NotFound } from '@/components/NotFound';
import { LazyImg } from '@/components/LazyImg';
import { Spinner } from '@/components/Spinner';

const cx = concatClasses.bind(styles);

export interface CollectionsDetailsPageState {
    films: Film[] | null;
    filmsCompilation?: FilmsCompilation;
    currentPage?: number;
    isLoading: boolean;
    isFirstLoading?: boolean;
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

    handlePageChange = async (page: number) => {
        const { params } = window.history.state as {
            params?: { uid?: string };
        };

        this.setState((prev) => ({ ...prev, isLoading: true }));

        await this.props.context?.content
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

    componentDidMount(): void {
        const { params } = window.history.state as {
            params?: { uid?: string };
        };

        const { isLoading } = this.state;

        const filmsByCollection =
            this.props.context?.content?.filmsByCollection?.[
                Number(params?.uid)
            ];

        const films = filmsByCollection?.films ?? null;

        if (films === null && !isLoading) {
            setTimeout(() => {
                this.setState((prev) => ({ ...prev, isFirstLoading: true }));
            });

            void this.handlePageChange(1).finally(() => {
                setTimeout(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isFirstLoading: false,
                    }));
                });
            });
        }
    }

    render(): AppNode {
        const { params } = window.history.state as {
            params?: { uid?: string };
        };

        const { isLoading, error, isFirstLoading } = this.state;

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

        return (
            <LayoutWithHeader>
                {!!error && <NotFound description="Подборка не найдена" />}
                {!error && isFirstLoading && (
                    <div className={cx('loader-container')}>
                        <Spinner />
                    </div>
                )}
                {!error && !isFirstLoading && (
                    <section>
                        <header className={cx('header')}>
                            <LazyImg
                                src={getStaticUrl(
                                    filmsCompilation?.compilation?.poster,
                                )}
                                className={cx('poster')}
                                alt="Постер подборки"
                            />
                            <h1 className={cx('head')}>
                                {filmsCompilation?.compilation?.title}
                            </h1>
                        </header>
                        <div className={cx('grid-container')}>
                            {films?.map((film) => (
                                <FilmCard
                                    film={film}
                                    className={cx('film-card')}
                                />
                            ))}
                        </div>
                        {currentPage < (filmsCompilation?.total_pages ?? 0) && (
                            <Button
                                onClick={() => {
                                    void this.handlePageChange(
                                        (currentPage ?? 0) + 1,
                                    );
                                }}
                                isLoading={isLoading}
                                outlined
                                styleType="secondary"
                                className={cx('more-button')}
                            >
                                Показать еще
                            </Button>
                        )}
                    </section>
                )}
            </LayoutWithHeader>
        );
    }
}

export const CollectionsDetailsPage = ContentContext.Connect(
    CollectionsDetailsPageClass,
);
