import type { Review, ReviewDetails } from './types';
import { reviewRoutes } from './routes';

import { appFetch } from '@/api/appFetch.ts';

class ReviewService {
    /**
     * Создание отзыва
     * @param body {Review} Тело отзыва
     * @returns {Promise<unknown>} unknown
     */
    async createReview(body: Review) {
        return appFetch.post<Review, unknown>(reviewRoutes.review(), body);
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
