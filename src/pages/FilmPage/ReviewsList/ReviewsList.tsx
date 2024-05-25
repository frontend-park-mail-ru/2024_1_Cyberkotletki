import styles from './ReviewsList.module.scss';

import type { ProfileResponse } from '@/api/user/types';
import type { ReviewDetails } from '@/api/review/types';
import { ReviewCard } from '@/components/ReviewCard';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';
import type { OmitChildren } from '@/types/OmitChildren.types';

const cx = concatClasses.bind(styles);

export interface ReviewsListProps
    extends OmitChildren<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>
    > {
    reviews?: ReviewDetails[];
    profile?: ProfileResponse;
    onEditReviewClick: (reviewForEdit?: ReviewDetails | undefined) => void;
    onReviewRemove: (review?: ReviewDetails | undefined) => void;
}

export class ReviewsList extends AppComponent<ReviewsListProps> {
    render() {
        const {
            reviews,
            profile,
            onEditReviewClick,
            onReviewRemove,
            className,
            ...props
        } = this.props;

        return (
            <section className={cx('reviews-block', className)} {...props}>
                <h1>Отзывы:</h1>
                <div className={cx('reviews-list')}>
                    {reviews?.length ? (
                        reviews?.map((review) => (
                            <ReviewCard
                                className={cx('review-card')}
                                review={review}
                                onEditClick={onEditReviewClick}
                                profile={profile}
                                onReviewRemove={onReviewRemove}
                            />
                        ))
                    ) : (
                        <div>Отзывов пока нет</div>
                    )}
                </div>
            </section>
        );
    }
}
