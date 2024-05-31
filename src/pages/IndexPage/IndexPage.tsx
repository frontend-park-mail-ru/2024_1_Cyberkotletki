import styles from './IndexPage.module.scss';
import { FilmsCarouselPreview } from './FilmsCarouselPreview';

import { AppComponent } from '@/core';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import type { Film } from '@/api/content/types';
import { ContentContext } from '@/Providers/ContentProvider';
import type { AppContextComponentProps } from '@/types/Context.types';
import { concatClasses } from '@/utils';
import { routes } from '@/App/App.routes';
import type { ReviewDetails } from '@/api/review/types';
import { Carousel } from '@/components/Carousel';
import { ReviewCard } from '@/components/ReviewCard';
import { VisibleObserver } from '@/components/VisibleObserver';
import { LayoutPreview } from '@/layouts/LayoutPreview';

const cx = concatClasses.bind(styles);

export const BEST_FILMS_COMPILATION_ID = 1;
export const BEST_SERIALS_COMPILATION_ID = 26;

export interface IndexPageState {
    nearestReleases?: Film[];
    topFilms?: Film[];
    topSerials?: Film[];
    recentReviews?: ReviewDetails[];
    isReleaseLoading?: boolean;
    isTopFilmsLoading?: boolean;
    isTopSerialsLoading?: boolean;
}

export class IndexPageInner extends AppComponent<
    AppContextComponentProps,
    IndexPageState
> {
    loadReleases = () => {
        const { nearestReleases, loadNearestReleases } =
            this.props.context?.content ?? {};

        if (!nearestReleases) {
            this.setState((prev) => ({ ...prev, isReleaseLoading: true }));
            void loadNearestReleases?.()
                .then((nearestReleases) => {
                    this.setState((prev) => ({
                        ...prev,
                        nearestReleases,
                        isReleaseLoading: false,
                    }));
                })
                .catch(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isReleaseLoading: false,
                    }));
                });
        }
    };

    loadTopFilms = () => {
        const { filmsByCollection, loadCollectionFilms } =
            this.props.context?.content ?? {};

        if (!filmsByCollection?.[BEST_FILMS_COMPILATION_ID]) {
            this.setState((prev) => ({ ...prev, isTopFilmsLoading: true }));

            void loadCollectionFilms?.(BEST_FILMS_COMPILATION_ID, 1)
                .then((topFilms) => {
                    this.setState((prev) => ({
                        ...prev,
                        topFilms: topFilms.films?.slice(0, 10),
                        isTopFilmsLoading: false,
                    }));
                })
                .catch(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isTopFilmsLoading: false,
                    }));
                });
        }
    };

    loadTopSerials = () => {
        const { filmsByCollection, loadCollectionFilms } =
            this.props.context?.content ?? {};

        if (!filmsByCollection?.[BEST_SERIALS_COMPILATION_ID]) {
            this.setState((prev) => ({ ...prev, isTopSerialsLoading: true }));

            void loadCollectionFilms?.(BEST_SERIALS_COMPILATION_ID, 1)
                .then((topFilms) => {
                    this.setState((prev) => ({
                        ...prev,
                        topSerials: topFilms.films?.slice(0, 10),
                        isTopSerialsLoading: false,
                    }));
                })
                .catch(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isTopSerialsLoading: false,
                    }));
                });
        }
    };

    loadRecentReviews = () => {
        const { recentReviews, loadRecentReviews } =
            this.props.context?.content ?? {};

        if (!recentReviews) {
            void loadRecentReviews?.().then((recentReviews) => {
                this.setState((prev) => ({
                    ...prev,
                    recentReviews,
                }));
            });
        }
    };

    componentDidMount() {
        this.loadReleases();
        this.loadTopFilms();
        this.loadTopSerials();
        this.loadRecentReviews();
    }

    render() {
        const nearestReleases =
            this.state.nearestReleases ??
            this.props.context?.content?.nearestReleases;

        const topFilms =
            this.state.topFilms ??
            this.props.context?.content?.filmsByCollection?.[
                BEST_FILMS_COMPILATION_ID
            ].films?.slice(0, 10);

        const topSerials =
            this.state.topSerials ??
            this.props.context?.content?.filmsByCollection?.[
                BEST_SERIALS_COMPILATION_ID
            ].films?.slice(0, 10);

        const recentReviews =
            this.state.recentReviews ??
            this.props.context?.content?.recentReviews;

        const { isReleaseLoading, isTopFilmsLoading, isTopSerialsLoading } =
            this.state;

        return (
            <LayoutWithHeader>
                <div className={cx('content')}>
                    <FilmsCarouselPreview
                        films={nearestReleases}
                        withReleaseBadge
                        itemsPerView={4}
                        itemsPerViewMobile={1}
                        itemsPerViewTablet={2}
                        title="Ожидаемые релизы"
                        moreTitle="Календарь релизов"
                        moreLink={routes.releases()}
                        isLoading={!!isReleaseLoading}
                        loading="eager"
                    />
                    <FilmsCarouselPreview
                        films={topFilms}
                        itemsPerView={6}
                        itemsPerViewMobile={2}
                        itemsPerViewTablet={4}
                        title="Лучшие фильмы"
                        moreTitle="Показать все"
                        moreLink={routes.collections(BEST_FILMS_COMPILATION_ID)}
                        key="Лучшие фильмы"
                        isLoading={!!isTopFilmsLoading}
                    />
                    <FilmsCarouselPreview
                        films={topSerials}
                        itemsPerView={5}
                        itemsPerViewMobile={2}
                        itemsPerViewTablet={4}
                        title="Лучшие сериалы"
                        moreTitle="Показать все"
                        moreLink={routes.collections(
                            BEST_SERIALS_COMPILATION_ID,
                        )}
                        key="Лучшие сериалы"
                        isLoading={!!isTopSerialsLoading}
                    />
                    {!!recentReviews?.length && (
                        <VisibleObserver>
                            <LayoutPreview title="Последние отзывы">
                                <Carousel
                                    itemsPerView={3}
                                    itemsPerViewTablet={2}
                                    itemsPerViewMobile={1}
                                >
                                    {recentReviews.map((review) => (
                                        <div className={cx('card')}>
                                            <ReviewCard
                                                review={review}
                                                isSmall
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </LayoutPreview>
                        </VisibleObserver>
                    )}
                </div>
            </LayoutWithHeader>
        );
    }
}

class IndexPageClass extends AppComponent<AppContextComponentProps> {
    render() {
        return <IndexPageInner context={this.props.context} />;
    }
}

export const IndexPage = ContentContext.Connect(IndexPageClass);
