const MIN_PASSWORD_LENGTH = 8 as const;
const MAX_PASSWORD_LENGTH = 32 as const;

// регулярное выражение для проверки формата электронной почты:
// строки, которые начинаются с одного или более символов, за
// которыми следует символ @, за которым следует еще один
// или более символов, за которыми следует точка и еще один
// или более символов до конца строки
const EMAIL_REGEXP =
    /^([a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/;

export const PasswordErrorReasonType = {
    PASSWORD_SHORT: 'PASSWORD_SHORT',
    PASSWORD_LONG: 'PASSWORD_LONG',
    PASSWORD_INCORRECT: 'PASSWORD_INCORRECT',
    PASSWORD_UPPERCASE: 'PASSWORD_UPPERCASE',
    PASSWORD_LOWERCASE: 'PASSWORD_LOWERCASE',
    PASSWORD_DIGIT: 'PASSWORD_DIGIT',
    PASSWORD_SPECIAL_SYMBOLS: 'PASSWORD_SPECIAL_SYMBOLS',
} as const;

/**
 * Валидация почты
 * @param {string} email почта для проверки
 * @returns {boolean} Валидный ли Email
 */
export function validateEmail(email: string) {
    return EMAIL_REGEXP.test(email);
}

/**
 * Валидация пароля - проверка длины и размера в байтах
 * @param {string} password пароль для проверки
 * @returns isValid: boolean, reasonType: string
 */
export function validatePassword(password: string) {
    if (password.length < MIN_PASSWORD_LENGTH) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_SHORT,
        } as const;
    }

    if (password.length > MAX_PASSWORD_LENGTH) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_LONG,
        } as const;
    }

    if (!/^[!@#$%^&*\w]+$/.test(password)) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_INCORRECT,
        } as const;
    }

    if (!/[A-Z]/.test(password)) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_UPPERCASE,
        } as const;
    }

    if (!/[a-z]/.test(password)) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_LOWERCASE,
        } as const;
    }

    if (!/\d/.test(password)) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_DIGIT,
        } as const;
    }

    if (!/[!@#$%^&*]/.test(password)) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_SPECIAL_SYMBOLS,
        } as const;
    }

    return { isValid: true } as const;
}

/**
 * Проверка совпадения паролей
 * @param {string} password1 password1
 * @param {string}  password2 password2
 * @returns `password2 === password2`
 */
export function validatePasswordMatch(password1?: string, password2?: string) {
    return password1 === password2;
}
