import { createQueryParams } from '@/utils';

class ReviewRoutes {
    review = (): string => '/review' as const;

    reviewContent = (id: number, page: number): string =>
        `/review/content/${id}/${page}` as const;

    meReview = (id: number): string =>
        `/review/myReview${createQueryParams({ content_id: id })}` as const;
}

export const reviewRoutes = new ReviewRoutes();
