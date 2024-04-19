import { ReviewFormError } from './ReviewForm.constants';

import type { CreateReviewBody } from '@/api/review/types';
import { isDefined } from '@/utils';
import {
    validateReviewText,
    validateReviewTitle,
} from '@/validators/validators';

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

    const textError = getReviewFormTitleError(text);

    const titleError = getReviewFormTextError(title);

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

export const getReviewFormTitleError = (title?: string) => {
    if (!title) {
        return ReviewFormError.EMPTY_VALUE;
    }

    const titleValidation = validateReviewTitle(title);

    if (!titleValidation.isValid) {
        return ReviewFormError[titleValidation.reasonType];
    }

    return '';
};

export const getReviewFormTextError = (text?: string) => {
    if (!text) {
        return ReviewFormError.EMPTY_VALUE;
    }

    const textValidation = validateReviewText(text);

    if (!textValidation.isValid) {
        return ReviewFormError[textValidation.reasonType];
    }

    return '';
};
