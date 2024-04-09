import type { ChangeProfileBody } from '@/api/user/types';
import { AuthFormError } from '@/components/LoginForm/Form/Form.constants';
import { getEmailError } from '@/components/LoginForm/Form/Form.utils';

export const validateBaseForm = ({ email, name }: ChangeProfileBody) => {
    const emailError = getEmailError(email);
    const nameError = name ? '' : AuthFormError.EMPTY_VALUE;

    if (emailError || nameError) {
        return { isValid: false, emailError, nameError } as const;
    }

    return { isValid: true } as const;
};
