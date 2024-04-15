import { ReviewFormError } from './ReviewForm.constants';

import type { Review } from '@/api/review/types';
import { isDefined } from '@/utils';

export const validateReviewForm = ({ rating, text, title }: Review) => {
    const ratingError = isDefined(rating)
        ? ''
        : ReviewFormError.RATING_EMPTY_VALUE;

    const textError = text.trim() ? '' : ReviewFormError.EMPTY_VALUE;

    const titleError = title.trim() ? '' : ReviewFormError.EMPTY_VALUE;

    if (ratingError || textError || titleError) {
        return { isValid: false, ratingError, textError, titleError } as const;
    }

    return { isValid: true } as const;
};
