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

const cx = concatClasses.bind(styles);
interface Params {
    uid?: string;
}

export interface FilmPageState {
    film?: Film;
    isNotFound?: boolean;
    reviews?: ReviewDetails[];
    isLoading?: boolean;
}

class FilmPageInner extends AppComponent<object, FilmPageState> {
    getFilmById = (uid: number) => {
        if (isDefined(uid)) {
            this.setState((prev) => ({ ...prev, isLoading: true }));

            void reviewService.getContentReviews(uid).then((data) => {
                this.setState((prev) => ({ ...prev, reviews: data?.reviews }));
            });

            void contentService
                .getFilmById(uid)
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

    render(): AppNode {
        const { params } = window.history.state as { params?: Params };

        const { isLoading, film, isNotFound } = this.state;

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
                    <h1>Отзывы</h1>
                    <div className={cx('reviews-list')}>
                        {this.state.reviews?.length ? (
                            this.state.reviews?.map((review) => (
                                <ReviewCard review={review} />
                            ))
                        ) : (
                            <div>Отзывов еще никто не сделал</div>
                        )}
                    </div>
                </section>
                <section className={cx('write-review-block')} id="write-review">
                    <h1>Написать отзыв:</h1>
                    <ReviewForm contentId={+(params?.uid ?? 0)} />
                </section>
            </div>
        );
    }
}

export class FilmPage extends AppComponent {
    render(): AppNode {
        return (
            <LayoutWithHeader>
                <FilmPageInner />
            </LayoutWithHeader>
        );
    }
}
