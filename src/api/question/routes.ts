import { createQueryParams } from '@/utils';

class QuestionRoutes {
    polls = (id?: number): string => `/polls${id ? `/${id}` : ''}` as const;

    pollName = (pollName: string): string =>
        `/polls${createQueryParams({ pollName })}` as const;
}

export const questionRoutes = new QuestionRoutes();
