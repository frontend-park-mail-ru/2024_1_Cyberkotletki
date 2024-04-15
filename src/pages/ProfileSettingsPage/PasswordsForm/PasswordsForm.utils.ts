import type { FormValues } from './PasswordsForm';

import { AuthFormError } from '@/components/LoginForm/Form/Form.constants';
import {
    getPasswordError,
    getPasswordRepeatError,
} from '@/components/LoginForm/Form/Form.utils';

export const validatePasswordForm = ({
    oldPassword,
    newPassword,
    newPasswordRepeat,
}: FormValues) => {
    const oldPassError = oldPassword ? '' : AuthFormError.EMPTY_VALUE;
    const newPassError = getPasswordError(newPassword);
    const newPassRepError = getPasswordRepeatError(
        newPassword,
        newPasswordRepeat,
    );

    if (oldPassError || newPassError || newPassRepError) {
        return {
            isValid: false,
            oldPassError,
            newPassError,
            newPassRepError,
        } as const;
    }

    return { isValid: true } as const;
};
