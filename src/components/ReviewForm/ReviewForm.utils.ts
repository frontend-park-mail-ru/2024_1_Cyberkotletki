import { ReviewFormError } from './ReviewForm.constants';

import type { Review } from '@/api/review/types';
import { isDefined } from '@/utils';
import {
    validateReviewText,
    validateReviewTitle
} from "@/validators/validators";

export const validateReviewForm = ({ rating, text, title }: Review) => {

    const ratingError = isDefined(rating)
        ? ''
        : ReviewFormError.RATING_EMPTY_VALUE;

    // const textError = text.trim() ? '' : ReviewFormError.EMPTY_VALUE;
    const textError = getReviewFormTitleError(text);


    //const titleError = title.trim() ? '' : ReviewFormError.EMPTY_VALUE;
    const titleError = getReviewFormTextError(title);

    if (ratingError || textError || titleError) {
        return { isValid: false, ratingError, textError, titleError } as const;
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
}

export const getReviewFormTextError = (text?: string) => {
    if (!text) {
        return ReviewFormError.EMPTY_VALUE;
    }

    const textValidation = validateReviewText(text);

    if (!textValidation.isValid) {
        return ReviewFormError[textValidation.reasonType];
    }

    return '';
}
