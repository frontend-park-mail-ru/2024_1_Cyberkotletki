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
    const oldPassError = oldPassword.trim() ? '' : AuthFormError.EMPTY_VALUE;
    const newPassError = getPasswordError(newPassword).message;
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

    const formError =
        oldPassword === newPassword ? 'Старый и новый пароли совпадают' : '';

    if (formError) {
        return { isValid: false, formError } as const;
    }

    return { isValid: true } as const;
};
