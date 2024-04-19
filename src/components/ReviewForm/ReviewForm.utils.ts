import { ReviewFormError } from './ReviewForm.constants';

import type { CreateReviewBody } from '@/api/review/types';
import { isDefined } from '@/utils';

export const validateReviewForm = (
    { rating, text, title }: CreateReviewBody,
    {
        rating: ratingInitial,
        text: textInitial,
        title: titleInitial,
    }: Partial<CreateReviewBody>,
) => {
    const ratingError = isDefined(rating)
        ? ''
        : ReviewFormError.RATING_EMPTY_VALUE;

    const textError = text.trim() ? '' : ReviewFormError.EMPTY_VALUE;

    const titleError = title.trim() ? '' : ReviewFormError.EMPTY_VALUE;

    if (ratingError || textError || titleError) {
        return { isValid: false, ratingError, textError, titleError } as const;
    }

    if (
        +rating === +(ratingInitial ?? 0) &&
        text.trim() === textInitial?.trim() &&
        title.trim() === titleInitial?.trim()
    ) {
        return { isValid: false, error: 'Вы не изменили отзыв' } as const;
    }

    return { isValid: true } as const;
};
