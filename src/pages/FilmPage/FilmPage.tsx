import { FilmMainContent } from './FilmMainContent';
import styles from './FilmPage.module.scss';

import { contentService } from '@/api/content/service';
import type { Film } from '@/api/content/types';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses, isDefined } from '@/utils';
import { NotFound } from '@/components/NotFound';
import { ReviewForm } from '@/components/ReviewForm';
import { reviewService } from '@/api/review/service';
import type { ReviewDetails } from '@/api/review/types';
import { ReviewCard } from '@/components/ReviewCard';
import { ProfileContext } from '@/Providers/ProfileProvider';
import type { ProfileResponse } from '@/api/user/types';
import type { AppContext } from '@/types/Context.types';

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
}

export const REVIEW_FORM_ID = 'review-form';

export interface FilmPageInnerProps {
    context?: AppContext;
    uid?: string;
}

class FilmPageInnerClass extends AppComponent<
    FilmPageInnerProps,
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
            void profile?.getProfile().then((profile) => {
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

        this.getFilmById(Number(params?.uid));
    };

    handleEditReviewClick = (reviewForEdit?: ReviewDetails) => {
        this.setState((prev) => ({ ...prev, reviewForEdit }));
    };

    getFilmById = (id: number) => {
        if (isDefined(id)) {
            this.setState((prev) => ({ ...prev, isLoading: true }));

            this.getFilmReviews(id);

            void contentService
                .getFilmById(id)
                .then((film) => {
                    this.setState((prev) => ({ ...prev, film }));
                })
                .catch(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isNotFound: true,
                    }));
                })
                .finally(() => {
                    this.setState((prev) => ({ ...prev, isLoading: false }));
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

                this.getFilmById(Number(params?.uid));
            });
        }
    };

    componentDidMount() {
        this.getProfile();
    }

    render(): AppNode {
        const { params } = window.history.state as { params?: Params };

        const { isLoading, film, isNotFound, isEdit, reviewForEdit } =
            this.state;
        const profile =
            this.state.profile || this.props.context?.profile?.profile;

        if (
            (!film || params?.uid !== `${film?.id ?? 0}`) &&
            !isLoading &&
            !isNotFound
        ) {
            this.getFilmById(Number(params?.uid));
        }

        return isNotFound ? (
            <NotFound description="Фильм не найден" />
        ) : (
            <div>
                <FilmMainContent film={this.state.film} />
                <section className={cx('reviews-block')}>
                    <h1>Отзывы:</h1>
                    <div className={cx('reviews-list')}>
                        {this.state.reviews?.length ? (
                            this.state.reviews?.map((review) => (
                                <ReviewCard
                                    className={cx('review-card')}
                                    review={review}
                                    onEditClick={this.handleEditReviewClick}
                                    profile={profile}
                                    onReviewRemove={this.handleReviewRemove}
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
        );
    }
}

const FilmPageInner = ProfileContext.Connect(FilmPageInnerClass);

export class FilmPage extends AppComponent<object, { key?: string }> {
    state = { key: (window.history.state as { params?: Params }).params?.uid };

    render(): AppNode {
        const { params } = window.history.state as { params?: Params };

        if (params?.uid !== this.state.key) {
            this.setState((prev) => ({ ...prev, key: params?.uid }));

            this.forceUpdate();

            return (
                <LayoutWithHeader key={params?.uid}>
                    <FilmPageInner key={params?.uid} uid={params?.uid} />
                </LayoutWithHeader>
            );
        }

        return (
            <LayoutWithHeader key={this.state.key}>
                <FilmPageInner key={this.state.key} uid={this.state.key} />
            </LayoutWithHeader>
        );
    }
}
