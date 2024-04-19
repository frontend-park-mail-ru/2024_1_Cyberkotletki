import type { ChangeProfileBody } from '@/api/user/types';
import { AuthFormError } from '@/components/LoginForm/Form/Form.constants';
import { getEmailError } from '@/components/LoginForm/Form/Form.utils';

export const getNameError = (name?: string) => {
    switch (true) {
        case !name:
            return AuthFormError.EMPTY_VALUE;
        case (name?.length ?? 0) > 30:
            return 'Имя не может быть длиннее 30 символов';
        default:
            return '';
    }
};

export const validateBaseForm = (
    { email, name }: ChangeProfileBody,
    {
        emailInitial,
        nameInitial,
    }: { emailInitial?: string; nameInitial?: string },
) => {
    const emailError = getEmailError(email);
    const nameError = getNameError(name);

    if (emailError || nameError) {
        return { isValid: false, emailError, nameError } as const;
    }

    if (email === emailInitial && name === nameInitial) {
        return {
            isValid: false,
        } as const;
    }

    return { isValid: true } as const;
};
