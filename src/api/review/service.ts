import type {
    CreateReviewBody,
    ReviewDetails,
    UpdateReviewBody,
} from './types';
import { reviewRoutes } from './routes';

import { ResponseError, appFetch } from '@/api/appFetch.ts';
import { ResponseStatus } from '@/shared/constants';
import { AuthError } from '@/api/auth/constants';

export const ReviewError = {
    UNAUTHORIZED: 'Чтобы оставить отзыв, необходимо авторизоваться',
    CONFLICT: 'Вы не можете оставить отзыв второй раз',
} as const;

const throwReviewError = (error: unknown) => {
    if (error instanceof ResponseError) {
        switch (error.statusCode) {
            case ResponseStatus.UNAUTHORIZED:
                throw new ResponseError(
                    ReviewError.UNAUTHORIZED,
                    error.statusCode,
                );
            case ResponseStatus.CONFLICT:
                throw new ResponseError(ReviewError.CONFLICT, error.statusCode);
            case ResponseStatus.BAD_REQUEST:
            case ResponseStatus.SERVICE_UNAVAILABLE:
                throw error;
            default:
                throw new Error(AuthError.UNKNOWN_ERROR);
        }
    }

    throw new Error(AuthError.UNKNOWN_ERROR);
};

class ReviewService {
    /**
     * Создание отзыва
     * @param {CreateReviewBody} Тело отзыва
     * @returns {Promise<unknown>} unknown
     */
    async createReview({ rating, title, text, contentID }: CreateReviewBody) {
        try {
            await appFetch.post<CreateReviewBody, unknown>(
                reviewRoutes.review(),
                {
                    rating,
                    contentID,
                    title: title.trim(),
                    text: text.trim(),
                },
            );
        } catch (error) {
            throwReviewError(error);
        }
    }

    /**
     * Обновление отзыва
     * @param {CreateReviewBody} Тело отзыва
     * @returns unknown
     */
    async updateReview({ rating, title, text, reviewID }: UpdateReviewBody) {
        try {
            await appFetch.put<UpdateReviewBody, unknown>(
                reviewRoutes.review(),
                {
                    rating,
                    reviewID,
                    title: title.trim(),
                    text: text.trim(),
                },
            );
        } catch (error) {
            throwReviewError(error);
        }
    }

    /**
     * Отзывы фильма/сериала
     * @param {number} id id контента
     * @param {number} page страница
     * @returns unknown
     */
    async getContentReviews(id: number, page = 1) {
        return appFetch.get<{ reviews?: ReviewDetails[] } | undefined>(
            reviewRoutes.reviewContent(id, page),
        );
    }

    /**
     * Мои отзывы фильма/сериала
     * @param {number} id id контента
     * @returns unknown
     */
    async getMyContentReview(id: number) {
        return appFetch.get<object | undefined>(reviewRoutes.myReview(id));
    }

    /**
     * Удалить отзыв
     * @param {number} id id отзыва
     * @returns unknown
     */
    async deleteReview(id: number) {
        return appFetch.delete(reviewRoutes.review(id));
    }

    /**
     * Получить последние отзывы пользователя
     * @param {number} id id профиля
     * @returns ReviewDetails[]
     */
    async getMyRecentReviews(id: number) {
        return appFetch.get<{ reviews?: ReviewDetails[] } | undefined>(
            reviewRoutes.userReviewRecent(id),
        );
    }

    /**
     * Получить последние отзывы
     * @returns unknown
     */
    async getRecentReviews() {
        return appFetch.get<{ reviews?: ReviewDetails[] } | undefined>(
            reviewRoutes.reviewRecent(),
        );
    }
}

export const reviewService = new ReviewService();
