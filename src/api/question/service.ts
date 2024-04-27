import type { CreateReviewBody } from './types';
import { questionRoutes } from './routes';

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

class QuestionService {
    /**
     * Создание отзыва
     * @param {CreateReviewBody} Тело отзыва
     * @returns {Promise<unknown>} unknown
     */
    async createReview({ pollName }: { pollName: string }) {
        try {
            await appFetch.post<CreateReviewBody, unknown>(
                questionRoutes.pollName(pollName),
            );
        } catch (error) {
            throwReviewError(error);
        }
    }
}

export const questionService = new QuestionService();
