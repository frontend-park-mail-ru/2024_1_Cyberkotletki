import { createQueryParams } from '@/utils';

class ReviewRoutes {
    review = (id?: number): string => `/review${id ? `/${id}` : ''}` as const;

    userReviewRecent = (id: number): string =>
        `/review/user/${id}/recent` as const;

    reviewContent = (id: number, page: number): string =>
        `/review/content/${id}/${page}` as const;

    myReview = (id: number): string =>
        `/review/myReview${createQueryParams({ content_id: id })}` as const;
}

export const reviewRoutes = new ReviewRoutes();
