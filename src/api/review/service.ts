import type { Review, ReviewDetails } from './types';
import { reviewRoutes } from './routes';

import { ResponseError, appFetch } from '@/api/appFetch.ts';
import { ResponseStatus } from '@/shared/constants';

class ReviewService {
    /**
     * Создание отзыва
     * @param {Review} Тело отзыва
     * @returns {Promise<unknown>} unknown
     */
    async createReview({ rating, title, text, contentID }: Review) {
        try {
            await appFetch.post<Review, unknown>(reviewRoutes.review(), {
                rating,
                contentID,
                title: title.trim(),
                text: text.trim(),
            });
        } catch (error) {
            if (error instanceof ResponseError) {
                if (error.statusCode === ResponseStatus.UNAUTHORIZED) {
                    throw new ResponseError(
                        'Чтобы оставить отзыв, нужно авторизоваться',
                        error.statusCode,
                    );
                }

                if (error.statusCode === ResponseStatus.CONFLICT) {
                    throw new ResponseError(
                        'Вы не можете оставить отзыв второй раз',
                        error.statusCode,
                    );
                }
            }

            throw error;
        }
    }

    async getContentReviews(id: number, page = 1) {
        return appFetch.get<{ reviews?: ReviewDetails[] } | undefined>(
            reviewRoutes.reviewContent(id, page),
        );
    }

    async getMyContentReview(id: number) {
        return appFetch.get<object | undefined>(reviewRoutes.meReview(id));
    }
}

export const reviewService = new ReviewService();
