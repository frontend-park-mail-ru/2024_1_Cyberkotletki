import { questionRoutes } from './routes';
import type { PollQuestion, PollQuestionBody } from './types';

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
    async createPoll({ pollName }: { pollName: string }) {
        try {
            await appFetch.post<unknown, unknown>(
                questionRoutes.pollName(pollName),
            );
        } catch (error) {
            throwReviewError(error);
        }
    }

    getLatestPoll() {
        return appFetch.get<{ questions: PollQuestion[] }>(
            questionRoutes.pollQuestions(1),
        );
    }

    async createQuestion(body: PollQuestionBody) {
        const createdQuestion = await appFetch.post<void, PollQuestion>(
            questionRoutes.polls(1),
        );

        const question = await appFetch.put<PollQuestionBody, PollQuestionBody>(
            questionRoutes.pollQuestion(),
            { ...body, text: body.text?.trim(), id: createdQuestion.id },
        );

        return question;
    }

    answerQuestion({ id, answer }: { id: number; answer: number }) {
        return appFetch.post<unknown, unknown>(
            questionRoutes.pollAnswer({ id, answer }),
        );
    }
}

export const questionService = new QuestionService();
