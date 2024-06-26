import type { InputTypeProps } from '@/components/Input/Input';
import { PasswordErrorReasonType } from '@/validators/validators';

export enum FormFields {
    EMAIL = 'email',
    PASSWORD = 'password',
    PASSWORD_REPEAT = 'passwordRepeat',
}

export type FormFieldsType = Record<FormFields, string | undefined>;

export const EMAIL_INPUT_PROPS: InputTypeProps = {
    label: 'Email',
    id: 'email',
    name: FormFields.EMAIL,
    type: 'text',
    autoComplete: 'email',
    inputMode: 'email',
    placeholder: 'Введите email...',
    required: true,
};

export const PASSWORD_INPUT_PROPS: InputTypeProps = {
    label: 'Пароль',
    id: 'password',
    name: FormFields.PASSWORD,
    type: 'password',
    autoComplete: 'password',
    placeholder: 'Введите пароль...',
    required: true,
};

export const PASSWORD_REPEAT_INPUT_PROPS: InputTypeProps = {
    label: 'Пароль повторно',
    id: 'password-repeat',
    name: FormFields.PASSWORD_REPEAT,
    type: 'password',
    autoComplete: 'new-password',
    placeholder: 'Введите пароль повторно...',
    required: true,
};

export const AuthFormError = {
    EMPTY_VALUE: 'Заполните поле',

    INVALID_EMAIL: 'Введен неверный Email',

    [PasswordErrorReasonType.PASSWORD_SHORT]:
        'Пароль должен содержать 8 символов или более',

    [PasswordErrorReasonType.PASSWORD_LONG]:
        'Пароль должен содержать не более 32 символов',

    [PasswordErrorReasonType.PASSWORD_INCORRECT]:
        'Пароль может состоять только из латиницы, цифр и специальных символов !@#$%^&*()_+-=.,',

    [PasswordErrorReasonType.PASSWORD_UPPERCASE]:
        'Пароль должен содержать как минимум одну заглавную букву',

    [PasswordErrorReasonType.PASSWORD_LOWERCASE]:
        'Пароль должен содержать как минимум одну строчную букву',

    [PasswordErrorReasonType.PASSWORD_DIGIT]:
        'Пароль должен содержать как минимум одну цифру',

    [PasswordErrorReasonType.PASSWORD_SPECIAL_SYMBOLS]:
        'Пароль должен содержать как минимум один из спец. символов !@#$%^&*',

    NOT_MATCH_PASSWORDS: 'Пароли не совпадают',

    EMAIL_EXISTS: 'Пользователь с таким Email уже существует',

    INCORRECT_DATA: 'Введен неверный Email или пароль',

    UNKNOWN_ERROR: 'Произошла неизвестная ошибка',
} as const;
