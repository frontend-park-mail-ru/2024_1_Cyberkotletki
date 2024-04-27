import { createQueryParams } from '@/utils';

class QuestionRoutes {
    polls = (id?: number): string => `/polls${id ? `/${id}` : ''}` as const;

    pollName = (pollName: string): string =>
        `/polls${createQueryParams({ pollName })}` as const;

    latestPoll = () => `/polls/latest` as const;

    pollQuestion = () => `/polls/question` as const;

    pollQuestions = (id: number) => `/polls/${id}/questions` as const;

    pollAnswer = ({ id, answer }: { id: number; answer: number }) =>
        `/polls/${id}/answer${createQueryParams({ answer })}` as const;
}

export const questionRoutes = new QuestionRoutes();
