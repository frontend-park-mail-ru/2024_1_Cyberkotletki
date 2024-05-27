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
}

export class IndexPageInner extends AppComponent<
    AppContextComponentProps,
    IndexPageState
> {
    loadReleases = () => {
        const { nearestReleases, loadNearestReleases } =
            this.props.context?.content ?? {};

        if (!nearestReleases) {
            void loadNearestReleases?.().then((nearestReleases) => {
                this.setState((prev) => ({ ...prev, nearestReleases }));
            });
        }
    };

    loadTopFilms = () => {
        const { filmsByCollection, loadCollectionFilms } =
            this.props.context?.content ?? {};

        if (!filmsByCollection?.[BEST_FILMS_COMPILATION_ID]) {
            void loadCollectionFilms?.(BEST_FILMS_COMPILATION_ID, 1).then(
                (topFilms) => {
                    this.setState((prev) => ({
                        ...prev,
                        topFilms: topFilms.films?.slice(0, 10),
                    }));
                },
            );
        }
    };

    loadTopSerials = () => {
        const { filmsByCollection, loadCollectionFilms } =
            this.props.context?.content ?? {};

        if (!filmsByCollection?.[BEST_SERIALS_COMPILATION_ID]) {
            void loadCollectionFilms?.(BEST_SERIALS_COMPILATION_ID, 1).then(
                (topFilms) => {
                    this.setState((prev) => ({
                        ...prev,
                        topSerials: topFilms.films?.slice(0, 10),
                    }));
                },
            );
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

        return (
            <LayoutWithHeader>
                <div className={cx('content')}>
                    {!!nearestReleases?.length && (
                        <FilmsCarouselPreview
                            films={nearestReleases}
                            withReleaseBadge
                            itemsPerView={4}
                            itemsPerViewMobile={1}
                            itemsPerViewTablet={2}
                            title="Ожидаемые релизы"
                            moreTitle="Календарь релизов"
                            moreLink={routes.releases()}
                            fadeInDelay={0}
                        />
                    )}
                    {!!topFilms?.length && (
                        <FilmsCarouselPreview
                            films={topFilms}
                            itemsPerView={6}
                            itemsPerViewMobile={2}
                            itemsPerViewTablet={4}
                            title="Лучшие фильмы"
                            moreTitle="Показать все"
                            moreLink={routes.collections(
                                BEST_FILMS_COMPILATION_ID,
                            )}
                        />
                    )}
                    {!!topSerials?.length && (
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
                        />
                    )}
                    {!!recentReviews && (
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
