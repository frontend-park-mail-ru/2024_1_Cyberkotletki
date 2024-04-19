import { ReviewFormError } from './ReviewForm.constants';

import type { CreateReviewBody } from '@/api/review/types';
import { isDefined } from '@/utils';

const MAX_REVIEW_TEXT_LENGTH = 10000 as const;
const MAX_REVIEW_TITLE_LENGTH = 50 as const;
const MIN_REVIEW_TEXT_LENGTH = 1 as const;
const MIN_REVIEW_TITLE_LENGTH = 1 as const;

/**
 * Валидация заголовка отзыва
 * @param title заголовок отзыва
 * @returns Текст ошибки
 */
export const getReviewFormTitleError = (title?: string) => {
    const trimTitle = title?.trim();

    switch (true) {
        case !trimTitle:
            return ReviewFormError.EMPTY_VALUE;
        case (trimTitle?.length ?? 0) < MIN_REVIEW_TITLE_LENGTH:
            return ReviewFormError.REVIEW_TITLE_SHORT;
        case (trimTitle?.length ?? 0) > MAX_REVIEW_TITLE_LENGTH:
            return ReviewFormError.REVIEW_TITLE_LONG;
        default:
            return '';
    }
};

/**
 * Валидация текста отзыва
 * @param text текст отзыва
 * @returns Текст ошибки
 */
export const getReviewFormTextError = (text?: string) => {
    const trimText = text?.trim();

    switch (true) {
        case !trimText:
            return ReviewFormError.EMPTY_VALUE;
        case (trimText?.length ?? 0) < MIN_REVIEW_TEXT_LENGTH:
            return ReviewFormError.REVIEW_TEXT_SHORT;
        case (trimText?.length ?? 0) > MAX_REVIEW_TEXT_LENGTH:
            return ReviewFormError.REVIEW_TEXT_LONG;
        default:
            return '';
    }
};

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

    const titleError = getReviewFormTitleError(title);

    const textError = getReviewFormTextError(text);

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
