export enum ReviewFormFields {
    RATING = 'rating',
    TITLE = 'title',
    TEXT = 'text',
}

export const ReviewFormError = {
    EMPTY_VALUE: 'Заполните поле',
    RATING_EMPTY_VALUE: 'Вы не поставили оценку',
    REVIEW_TEXT_SHORT: 'Отзыв слишком короткий',
    REVIEW_TEXT_LONG: 'Отзыв превышает 10000 символов',
    REVIEW_TITLE_SHORT: 'Заголовок слишком короткий',
    REVIEW_TITLE_LONG: 'Заголовок превышает 50 символов',
} as const;
