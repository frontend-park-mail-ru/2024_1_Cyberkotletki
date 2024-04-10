import { FilmMainContent } from './FilmMainContent';
import styles from './FilmPage.module.scss';

import { ResponseError } from '@/api/appFetch';
import { contentService } from '@/api/content/service';
import type { Film } from '@/api/content/types';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses, isDefined } from '@/utils';
import { ResponseStatus } from '@/shared/constants';
import { NotFound } from '@/components/NotFound';
import { ReviewForm } from '@/components/ReviewForm';
import { userService } from '@/api/user/service';
import type { ProfileResponse } from '@/api/user/types';
import { reviewService } from '@/api/review/service';
import type { ReviewDetails } from '@/api/review/types';
import { ReviewCard } from '@/components/ReviewCard';

const cx = concatClasses.bind(styles);
interface Params {
    uid?: string;
}

export interface FilmPageState {
    film?: Film;
    isNotFound?: boolean;
    profile?: ProfileResponse;
    params?: Params;
    reviews?: ReviewDetails[];
}

export class FilmPage extends AppComponent<object, FilmPageState> {
    componentDidMount(): void {
        const { params } = window.history.state as { params?: Params };

        this.setState((prev) => ({ ...prev, params }));

        void userService.getProfile().then((profile) => {
            this.setState((prev) => ({ ...prev, profile }));
        });

        if (params?.uid) {
            void reviewService.getContentReviews(+params.uid).then((data) => {
                this.setState((prev) => ({ ...prev, reviews: data?.reviews }));
            });
        }

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
                    <div>
                        <FilmMainContent film={this.state.film} />
                        <section className={cx('reviews-block')}>
                            <h1>Отзывы</h1>
                            <div>
                                {this.state.reviews?.length ? (
                                    this.state.reviews?.map((review) => (
                                        <ReviewCard review={review} />
                                    ))
                                ) : (
                                    <div>Отзывов еще никто не сделал</div>
                                )}
                            </div>
                        </section>
                        <section
                            className={cx('write-review-block')}
                            id="write-review"
                        >
                            <h1>Написать отзыв:</h1>
                            <ReviewForm
                                profile={this.state.profile}
                                contentId={+(this.state.params?.uid ?? '')}
                            />
                        </section>
                    </div>
                )}
            </LayoutWithHeader>
        );
    }
}
