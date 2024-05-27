import { createQueryParams } from '@/utils';

class ReviewRoutes {
    review = (id?: number) => `/review${id ? `/${id}` : ''}` as const;

    userReviewRecent = (id: number) => `/review/user/${id}/recent` as const;

    reviewContent = (id: number, page: number) =>
        `/review/content/${id}/${page}` as const;

    myReview = (id: number) =>
        `/review/myReview${createQueryParams({ content_id: id })}` as const;

    reviewRecent = () => `/review/recent` as const;
}

export const reviewRoutes = new ReviewRoutes();
