import { FilmMainContent } from './FilmMainContent';
import styles from './FilmPage.module.scss';
import { ReviewsList } from './ReviewsList';
import { ReviewFormBlock } from './ReviewFormBlock';
import { SimilarContentBlock } from './SimilarContentBlock';

import type { Film } from '@/api/content/types';
import { AppComponent } from '@/core';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses, isDefined } from '@/utils';
import { NotFound } from '@/components/NotFound';
import { reviewService } from '@/api/review/service';
import type { ReviewDetails } from '@/api/review/types';
import { ProfileContext } from '@/Providers/ProfileProvider';
import type { ProfileResponse } from '@/api/user/types';
import type { AppContextComponentProps } from '@/types/Context.types';
import { favouriteService } from '@/api/favourite/favourite.service';
import { Spinner } from '@/components/Spinner';
import { ContentContext } from '@/Providers/ContentProvider';
import type { ParamsProps } from '@/types/ParamsProps.types';
import { contentService } from '@/api/content/service';
import { PostersCarousel } from '@/pages/FilmPage/PostersCarousel';
import { FactsAccordion } from '@/components/FactsAccordion';

const cx = concatClasses.bind(styles);

export interface FilmPageProps extends AppContextComponentProps {
    uid: number;
}

export interface FilmPageState {
    film?: Film;
    isNotFound?: boolean;
    reviews?: ReviewDetails[];
    isLoading?: boolean;
    reviewForEdit?: ReviewDetails;
    profile?: ProfileResponse;
    isEdit?: boolean;
    addedToFavourite?: boolean;
    ongoingSubscriptions?: number[];
}

export const REVIEW_FORM_ID = 'review-form';

class FilmPageClass extends AppComponent<FilmPageProps, FilmPageState> {
    finedOwnReview = () => {
        const { reviews } = this.state;

        const profile =
            this.state.profile ?? this.props.context?.profile?.profile;

        const ownReview = reviews?.find(
            (review) => review.authorID === profile?.id,
        );

        if (ownReview) {
            this.setState((prev) => ({
                ...prev,
                isEdit: true,
                reviewForEdit: ownReview,
            }));
        } else {
            this.setState((prev) => ({
                ...prev,
                isEdit: false,
                reviewForEdit: undefined,
            }));
        }
    };

    getProfile = () => {
        const { profile } = this.props.context ?? {};

        if (!isDefined(profile?.isLoggedIn)) {
            void profile?.getProfilePromise?.then((profile) => {
                this.setState((prev) => ({ ...prev, profile }));

                if (this.state.reviews?.length) {
                    this.finedOwnReview();
                }

                // eslint-disable-next-line max-len
                void this.props.context?.profile?.loadOngoingSubscriptionsPromise?.then(
                    (ids) => {
                        this.setState((prev) => ({
                            ...prev,
                            ongoingSubscriptions: ids,
                        }));
                    },
                );
            });
        } else if (profile?.isLoggedIn) {
            this.finedOwnReview();
        }
    };

    getFilmReviews = (id: number) => {
        void reviewService.getContentReviews(id).then((data) => {
            this.setState((prev) => ({ ...prev, reviews: data?.reviews }));

            if (this.state.profile || this.props.context?.profile) {
                this.finedOwnReview();
            }
        });
    };

    handleFormSubmit = () => {
        this.getFilmReviews(this.props.uid);
    };

    handleEditReviewClick = (reviewForEdit?: ReviewDetails) => {
        this.setState((prev) => ({ ...prev, reviewForEdit }));
    };

    getFilmById = (id: number) => {
        if (isDefined(id)) {
            this.setState((prev) => ({ ...prev, isLoading: true }));

            this.getFilmReviews(id);

            void this.props.context?.content
                ?.loadFilmById?.(id)
                .finally(() => {
                    this.setState((prev) => ({ ...prev, isLoading: false }));
                })
                .then((film) => {
                    this.setState((prev) => ({ ...prev, film }));
                })
                .catch(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isNotFound: true,
                    }));
                });
        } else {
            this.setState((prev) => ({
                ...prev,
                isNotFound: true,
            }));
        }
    };

    handleReviewRemove = (review?: ReviewDetails) => {
        if (isDefined(review?.id)) {
            void reviewService.deleteReview(review.id).then(() => {
                this.getFilmReviews(this.props.uid);
            });
        }
    };

    handleAddToFavourite = (film?: Film) => {
        if (isDefined(film?.id)) {
            const promise = this.state.addedToFavourite
                ? favouriteService.deleteFavouriteContent(film.id)
                : favouriteService.addToFavourite(film.id);

            void promise.then(() => {
                this.setState((prev) => ({
                    ...prev,
                    addedToFavourite: !this.state.addedToFavourite,
                }));

                this.props.context?.content?.resetFavouriteFilms();
            });
        }
    };

    handleSubscribe = (film?: Film) => {
        if (isDefined(film?.id)) {
            const ongoingSubscriptions =
                this.state.ongoingSubscriptions ??
                this.props.context?.profile?.ongoingSubscriptions;

            const subscribed = ongoingSubscriptions?.includes(this.props.uid);

            const promise = subscribed
                ? contentService.unSubscribeRelease(film.id)
                : contentService.subscribeRelease(film.id);

            if (!subscribed) {
                void Notification.requestPermission();
            }

            void promise.then(() => {
                void this.props.context?.profile
                    ?.loadOngoingSubscriptions?.()
                    .then((ids) => {
                        this.setState((prev) => ({
                            ...prev,
                            ongoingSubscriptions: ids,
                        }));
                    });
            });
        }
    };

    getIsAddedToFavourite = () => {
        void favouriteService
            .getContentFavouriteStatus(this.props.uid)
            .then(() => {
                this.setState((prev) => ({ ...prev, addedToFavourite: true }));
            })
            .catch(() => {
                this.setState((prev) => ({ ...prev, addedToFavourite: false }));
            });
    };

    loadAllData = () => {
        const filmsMap = this.props.context?.content?.filmsMap;

        this.getProfile();
        this.getIsAddedToFavourite();

        const paramsId = this.props.uid;

        if (!filmsMap?.[paramsId]) {
            this.getFilmById(paramsId);
        }

        this.getFilmReviews(paramsId);
    };

    componentDidMount() {
        this.loadAllData();
    }

    componentDidUpdate(
        _: FilmPageState | null,
        prevProps: FilmPageProps | null,
    ): void {
        if (prevProps?.uid !== this.props.uid) {
            this.loadAllData();
        }
    }

    render() {
        const film =
            this.props.context?.content?.filmsMap?.[this.props.uid] ??
            this.state.film;

        const {
            isNotFound,
            isEdit,
            reviewForEdit,
            addedToFavourite,
            isLoading,
        } = this.state;
        const profile =
            this.state.profile || this.props.context?.profile?.profile;

        const canWriteReview = !film?.ongoing;

        const ongoingSubscriptions =
            this.state.ongoingSubscriptions ??
            this.props.context?.profile?.ongoingSubscriptions;

        const subscribed = ongoingSubscriptions?.includes(this.props.uid);

        switch (true) {
            case isNotFound:
                return (
                    <LayoutWithHeader>
                        <NotFound description="Фильм не найден" />
                    </LayoutWithHeader>
                );
            case isLoading:
                return (
                    <LayoutWithHeader>
                        <div className={cx('loader-container')} key="loader">
                            <Spinner />
                        </div>
                    </LayoutWithHeader>
                );
            default:
                return (
                    <LayoutWithHeader>
                        <div className={cx('container')}>
                            <FilmMainContent
                                film={film}
                                onFavouriteClick={this.handleAddToFavourite}
                                addedToFavourite={addedToFavourite}
                                withFavButton={!!profile}
                                withBellButton={!!profile && film?.ongoing}
                                subscribed={subscribed}
                                onBellClick={this.handleSubscribe}
                            />
                            {!!film?.picturesURL?.length && (
                                <PostersCarousel
                                    pictures={film?.picturesURL}
                                    className={cx('posters-carousel')}
                                />
                            )}
                            {!!film?.similarContent?.length && (
                                <SimilarContentBlock
                                    className={cx('similar-list')}
                                    similarContent={film?.similarContent}
                                />
                            )}
                            {!!film?.facts?.length && (
                                <section className={cx('facts-section')}>
                                    <h1>Интересные факты</h1>
                                    <FactsAccordion facts={film?.facts} />
                                </section>
                            )}
                            {canWriteReview && (
                                <div className={cx('bottom-block')}>
                                    <div className={cx('reviews-block')}>
                                        <ReviewsList
                                            reviews={this.state.reviews}
                                            className={cx('reviews-list-block')}
                                            onEditReviewClick={
                                                this.handleEditReviewClick
                                            }
                                            onReviewRemove={
                                                this.handleReviewRemove
                                            }
                                            profile={profile}
                                        />
                                        <ReviewFormBlock
                                            className={cx('write-review-block')}
                                            id={REVIEW_FORM_ID}
                                            profile={profile}
                                            isEdit={isEdit}
                                            onSubmit={this.handleFormSubmit}
                                            reviewForEdit={reviewForEdit}
                                            contentId={this.props.uid}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </LayoutWithHeader>
                );
        }
    }
}

class FilmPageInner extends AppComponent<
    AppContextComponentProps & ParamsProps,
    ParamsProps
> {
    componentDidUpdate(
        _: object | null,
        prevProps: (AppContextComponentProps & ParamsProps) | null,
    ): void {
        if (this.props.params !== prevProps?.params) {
            this.setState((prev) => ({ ...prev, params: this.props.params }));
        }
    }

    render() {
        const uid = Number((window.history.state as ParamsProps).params?.uid);

        return <FilmPageClass context={this.props.context} uid={uid} />;
    }
}

export const FilmPage = ContentContext.Connect(
    ProfileContext.Connect(FilmPageInner),
);
