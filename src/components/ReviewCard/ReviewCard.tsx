import styles from './ReviewCard.module.scss';

import type { ReviewDetails } from '@/api/review/types';
import { Avatar } from '@/components/Avatar';
import { AppComponent } from '@/core';
import { concatClasses, getDateString } from '@/utils';

const cx = concatClasses.bind(styles);

export interface ReviewCardProps {
    review?: ReviewDetails;
}

export class ReviewCard extends AppComponent<ReviewCardProps> {
    render() {
        const { review } = this.props;

        return (
            <div>
                <div className={cx('top')}>
                    <Avatar
                        className={cx('avatar')}
                        width="64px"
                        height="64px"
                        imageSrc={review?.authorAvatar}
                    />
                    <div className={cx('username')}>
                        <div>{review?.authorName}</div>
                        <div>
                            {getDateString(review?.createdAt.slice(0, 16))}
                        </div>
                    </div>
                </div>
                <table className={cx('table')}>
                    <tbody>
                        <tr>
                            <td>Оценка:</td>
                            <td>
                                <div
                                    className={cx('rating-badge', {
                                        bad: true,
                                        medium: (review?.rating ?? 0) >= 4,
                                        good: (review?.rating ?? 0) >= 7,
                                    })}
                                >{`${review?.rating ?? 0}/10`}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>Заголовок:</td>
                            <td className={cx('title-cell')}>
                                {review?.title ?? ''}
                            </td>
                        </tr>
                        <tr>
                            <td>Текст:</td>
                            <td>{review?.text ?? ''}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
