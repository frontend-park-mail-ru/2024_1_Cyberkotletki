import { PasswordErrorReasonType } from '../../../validators/validators';

export const EMAIL_INPUT_PROPS = {
    label: 'Email',
    id: 'email',
    name: 'email',
    type: 'text',
    autocomplete: 'email',
    inputmode: 'email',
    placeholder: 'Введите email...',
    required: true,
};

export const PASSWORD_INPUT_PROPS = {
    label: 'Пароль',
    id: 'password',
    name: 'password',
    type: 'password',
    autocomplete: 'password',
    placeholder: 'Введите пароль...',
    required: true,
};

export const PASSWORD_REPEAT_INPUT_PROPS = {
    label: 'Пароль повторно',
    id: 'password-repeat',
    name: 'passwordRepeat',
    type: 'password',
    autocomplete: 'new-password',
    placeholder: 'Введите пароль повторно...',
    required: true,
};

export const AuthFormError = {
    /** @type {string} `Заполните поле`*/
    EMPTY_VALUE: 'Заполните поле',

    /** @type {string} `Введен неверный Email`*/
    INVALID_EMAIL: 'Введен неверный Email',

    /** @type {string} `Пароль должен содержать 8 символов или более`*/
    [PasswordErrorReasonType.PASSWORD_SHORT]:
        'Пароль должен содержать 8 символов или более',

    /** @type {string} `Пароль должен содержать не более 32 символов`*/
    [PasswordErrorReasonType.PASSWORD_LONG]:
        'Пароль должен содержать не более 32 символов',

    /**
     * @type {string} `Пароль должен состоять из латиницы, цифр и специальных
     * символов !@#$%^&*`
     */
    [PasswordErrorReasonType.PASSWORD_INCORRECT]:
        'Пароль должен состоять из латиницы, цифр и специальных символов !@#$%^&*',

    /**
     * @type {string} `Пароль должен содержать как минимум одну заглавную букву`
     */
    [PasswordErrorReasonType.PASSWORD_UPPERCASE]:
        'Пароль должен содержать как минимум одну заглавную букву',

    /**
     * @type {string} `Пароль должен содержать как минимум одну строчную букву`
     */
    [PasswordErrorReasonType.PASSWORD_LOWERCASE]:
        'Пароль должен содержать как минимум одну строчную букву',

    /** @type {string} `Пароль должен содержать как минимум одну цифру`*/
    [PasswordErrorReasonType.PASSWORD_DIGIT]:
        'Пароль должен содержать как минимум одну цифру',

    /**
     * @type {string} `Пароль должен
     * содержать как минимум один из спец. символов !@#$%^&*`
     */
    [PasswordErrorReasonType.PASSWORD_SPECIAL_SYMBOLS]:
        'Пароль должен содержать как минимум один из спец. символов !@#$%^&*',

    /** @type {string} `Пароли не совпадают`*/
    NOT_MATCH_PASSWORDS: 'Пароли не совпадают',

    /** @type {string} `Пользователь с таким email уже существует`*/
    EMAIL_EXISTS: 'Пользователь с таким Email уже существует',

    /** @type {string} `Введен неверный email или пароль`*/
    INCORRECT_DATA: 'Введен неверный Email или пароль',

    /** @type {string} `Произошла неизвестная ошибка`*/
    UNKNOWN_ERROR: 'Произошла неизвестная ошибка',
};
