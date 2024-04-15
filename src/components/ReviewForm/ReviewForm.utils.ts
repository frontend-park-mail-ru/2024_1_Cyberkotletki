import type { Review } from '@/api/review/types';
import { AuthFormError } from '@/components/LoginForm/Form/Form.constants';
import { isDefined } from '@/utils';

export const validateReviewForm = ({ rating, text, title }: Review) => {
    const ratingError = isDefined(rating) ? '' : 'Вы не поставили оценку';

    const textError = text ? '' : AuthFormError.EMPTY_VALUE;

    const titleError = title ? '' : AuthFormError.EMPTY_VALUE;

    if (ratingError || textError || titleError) {
        return { isValid: false, ratingError, textError, titleError } as const;
    }

    return { isValid: true } as const;
};
