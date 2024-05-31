import styles from './ReviewCard.module.scss';

import { routes } from '@/App/App.routes';
import type { ReviewDetails } from '@/api/review/types';
import type { ProfileResponse } from '@/api/user/types';
import { icEditUrl, icTrashUrl } from '@/assets/icons';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';
import { RemoveReviewModal } from '@/components/RemoveReviewModal';
import { AppComponent } from '@/core';
import { scrollToReviewForm } from '@/pages/FilmPage/FilmMainContent/FilmMainContent';
import { concatClasses, getDateString } from '@/utils';

const cx = concatClasses.bind(styles);

export interface ReviewCardProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref' | 'children'
    > {
    review?: ReviewDetails;
    onEditClick?: (review?: ReviewDetails) => void;
    profile?: ProfileResponse;
    onReviewRemove?: (review?: ReviewDetails) => void;
    onLikeClick?: (review?: ReviewDetails) => void;
    onDislikeClick?: (review?: ReviewDetails) => void;
    isSmall?: boolean;
}

export interface ReviewCardState {
    isModalOpened?: boolean;
}
export class ReviewCard extends AppComponent<ReviewCardProps, ReviewCardState> {
    handleEditClick = () => {
        scrollToReviewForm();
        this.props.onEditClick?.(this.props.review);
    };

    handleLikeClick = () => {
        this.props.onLikeClick?.(this.props.review);
    };

    handleDislikeClick = () => {
        this.props.onDislikeClick?.(this.props.review);
    };

    handleOpenModal = () => {
        this.setState((prev) => ({ ...prev, isModalOpened: true }));
    };

    handleCloseModal = () => {
        this.setState((prev) => ({ ...prev, isModalOpened: false }));
    };

    handleRemoveClick = () => {
        this.handleCloseModal();

        this.props.onReviewRemove?.(this.props.review);
    };

    render() {
        const { review, isSmall, className, ...props } = this.props;

        const { profile } = this.props;

        const isOwnReview = profile?.id === review?.authorID;

        const reviewBadge = (
            <div
                className={cx('rating-badge', {
                    bad: true,
                    medium: (review?.rating ?? 0) >= 4,
                    good: (review?.rating ?? 0) >= 7,
                })}
            >{`${review?.rating ?? 0}/10`}</div>
        );

        return (
            <div {...props} className={cx('card', className)}>
                <div className={cx('top')}>
                    <Avatar
                        className={cx('avatar')}
                        width="64px"
                        height="64px"
                        imageSrc={review?.authorAvatar}
                    />
                    <div className={cx('username')}>
                        <div title={review?.authorName}>
                            {review?.authorName}
                        </div>
                        {isSmall && (
                            <Link
                                href={routes.film(review?.contentID ?? 0)}
                                title={review?.contentName}
                            >
                                <u>
                                    <b>{review?.contentName}</b>
                                </u>
                            </Link>
                        )}
                        <div>{getDateString(review?.createdAt)}</div>
                    </div>
                    {isOwnReview && (
                        <div className={cx('action-buttons')}>
                            <Button
                                onClick={this.handleEditClick}
                                outlined
                                styleType="secondary"
                                isIconOnly
                                title="Редактировать отзыв"
                                aria-label="Редактировать отзыв"
                            >
                                <Icon icon={icEditUrl} />
                            </Button>
                            <Button
                                outlined
                                styleType="error"
                                isIconOnly
                                onClick={this.handleOpenModal}
                                title="Удалить отзыв"
                                aria-label="Удалить отзыв"
                            >
                                <Icon icon={icTrashUrl} />
                            </Button>
                        </div>
                    )}
                </div>
                <table className={cx('table')}>
                    <tbody>
                        <tr>
                            <td>
                                <div className={cx('rating-cell')}>
                                    Оценка: {isSmall && reviewBadge}
                                </div>
                            </td>
                            {!isSmall && <td>{reviewBadge}</td>}
                        </tr>
                        <tr>
                            {!isSmall && <td>Заголовок:</td>}
                            <td
                                className={cx('title-cell')}
                                title={review?.title}
                            >
                                <b>{review?.title ?? ''}</b>
                            </td>
                        </tr>
                        <tr>
                            {!isSmall && <td>Текст:</td>}
                            <td
                                className={cx('text-td', { small: isSmall })}
                                title={review?.text}
                            >
                                {review?.text ?? ''}
                            </td>
                        </tr>
                        {/** // Кнопки лайков */}
                        {/** // ? Soon... */}
                        {/* <tr>
                            <td></td>
                            <td>
                                <div className={cx('likes-container')}>
                                    <Button
                                        isIconOnly
                                        outlined
                                        styleType="secondary"
                                        disabled={isOwnReview}
                                        title="Нравится"
                                        onClick={this.handleLikeClick}
                                    >
                                        <Icon icon={icLikeUrl} />
                                    </Button>
                                    {review?.likes}

                                    <Button
                                        isIconOnly
                                        outlined
                                        styleType="secondary"
                                        disabled={isOwnReview}
                                        title="Не нравится"
                                        className={cx('dislike-button')}
                                        onClick={this.handleDislikeClick}
                                    >
                                        <Icon icon={icLikeUrl} />
                                    </Button>
                                    {review?.dislikes}
                                </div>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
                <RemoveReviewModal
                    isOpen={this.state.isModalOpened}
                    onClose={this.handleCloseModal}
                    onRemoveClick={this.handleRemoveClick}
                />
            </div>
        );
    }
}
