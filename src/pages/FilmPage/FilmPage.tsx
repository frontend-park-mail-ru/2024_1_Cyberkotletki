import { FilmMainContent } from './FilmMainContent';
import styles from './FilmPage.module.scss';

import type { Film } from '@/api/content/types';
import { AppComponent } from '@/core';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses, isDefined } from '@/utils';
import { NotFound } from '@/components/NotFound';
import { ReviewForm } from '@/components/ReviewForm';
import { reviewService } from '@/api/review/service';
import type { ReviewDetails } from '@/api/review/types';
import { ReviewCard } from '@/components/ReviewCard';
import { ProfileContext } from '@/Providers/ProfileProvider';
import type { ProfileResponse } from '@/api/user/types';
import type { AppContextComponentProps } from '@/types/Context.types';
import { favouriteService } from '@/api/favourite/favourite.service';
import { Spinner } from '@/components/Spinner';
import { ContentContext } from '@/Providers/ContentProvider';

const cx = concatClasses.bind(styles);
interface Params {
    uid?: string;
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
}

export const REVIEW_FORM_ID = 'review-form';

class FilmPageClass extends AppComponent<
    AppContextComponentProps,
    FilmPageState
> {
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
        const { params } = window.history.state as { params?: Params };

        this.getFilmReviews(Number(params?.uid));
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
                const { params } = window.history.state as { params?: Params };

                this.getFilmReviews(Number(params?.uid));
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

    getIsAddedToFavourite = () => {
        const { params } = window.history.state as { params?: Params };

        void favouriteService
            .getContentFavouriteStatus(+(params?.uid ?? ''))
            .then(() => {
                this.setState((prev) => ({ ...prev, addedToFavourite: true }));
            })
            .catch(() => {
                this.setState((prev) => ({ ...prev, addedToFavourite: false }));
            });
    };

    componentDidMount() {
        const { params } = window.history.state as { params?: Params };

        const filmsMap = this.props.context?.content?.filmsMap;

        this.getProfile();
        this.getIsAddedToFavourite();

        if (!filmsMap?.[Number(params?.uid)]) {
            this.getFilmById(Number(params?.uid));
        }
    }

    render() {
        const { params } = window.history.state as { params?: Params };

        const film =
            this.props.context?.content?.filmsMap?.[Number(params?.uid)] ??
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
                        <div key="content">
                            <FilmMainContent
                                film={film}
                                onFavouriteClick={this.handleAddToFavourite}
                                addedToFavourite={addedToFavourite}
                                withFavButton={!!profile}
                            />
                            <section className={cx('reviews-block')}>
                                <h1>Отзывы:</h1>
                                <div className={cx('reviews-list')}>
                                    {this.state.reviews?.length ? (
                                        this.state.reviews?.map((review) => (
                                            <ReviewCard
                                                className={cx('review-card')}
                                                review={review}
                                                onEditClick={
                                                    this.handleEditReviewClick
                                                }
                                                profile={profile}
                                                onReviewRemove={
                                                    this.handleReviewRemove
                                                }
                                            />
                                        ))
                                    ) : (
                                        <div>Отзывов пока нет</div>
                                    )}
                                </div>
                            </section>
                            <section
                                className={cx('write-review-block')}
                                id={REVIEW_FORM_ID}
                            >
                                <h1>
                                    {this.state.reviewForEdit
                                        ? 'Редактировать отзыв:'
                                        : 'Написать отзыв:'}
                                </h1>
                                <ReviewForm
                                    key={isEdit ? 'isEdit' : undefined}
                                    profile={profile}
                                    contentId={+(params?.uid ?? 0)}
                                    onSubmit={this.handleFormSubmit}
                                    isEdit={isEdit}
                                    reviewID={reviewForEdit?.id}
                                    {...reviewForEdit}
                                />
                            </section>
                        </div>
                    </LayoutWithHeader>
                );
        }
    }
}

class FilmPageInner extends AppComponent<AppContextComponentProps> {
    render() {
        return <FilmPageClass context={this.props.context} />;
    }
}

export const FilmPage = ContentContext.Connect(
    ProfileContext.Connect(FilmPageInner),
);
