const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 32;

export const PasswordErrorReasonType = {
    PASSWORD_SHORT: 'PASSWORD_SHORT',
    PASSWORD_LONG: 'PASSWORD_LONG',
    PASSWORD_INCORRECT: 'PASSWORD_INCORRECT',
    PASSWORD_UPPERCASE: 'PASSWORD_UPPERCASE',
    PASSWORD_LOWERCASE: 'PASSWORD_LOWERCASE',
    PASSWORD_DIGIT: 'PASSWORD_DIGIT',
    PASSWORD_SPECIAL_SYMBOLS: 'PASSWORD_SPECIAL_SYMBOLS',
};

/**
 * Валидация почты
 * @param {string} email почта для проверки
 * @returns {boolean} Валидный ли Email
 */
export function validateEmail(email) {
    // регулярное выражение для проверки формата электронной почты:
    // строки, которые начинаются с одного или более символов, за
    // которыми следует символ @, за которым следует еще один
    // или более символов, за которыми следует точка и еще один
    // или более символов до конца строки
    const emailRegex =
        /^([a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/;

    return emailRegex.test(email);
}

/**
 * Валидация пароля - проверка длины и размера в байтах
 * @param {string} password пароль для проверки
 * @returns {{
 * isValid:boolean,
 * reasonType:
 * 'PASSWORD_SHORT'
 * |'PASSWORD_LONG'
 * |'PASSWORD_INCORRECT'
 * |'PASSWORD_UPPERCASE'
 * |'PASSWORD_LOWERCASE'
 * |'PASSWORD_DIGIT'
 * |'PASSWORD_SPECIAL_SYMBOLS'}}} return
 */
export function validatePassword(password) {
    if (password.length < MIN_PASSWORD_LENGTH) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_SHORT,
        };
    }

    if (password.length > MAX_PASSWORD_LENGTH) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_LONG,
        };
    }

    if (!/^[!@#$%^&*\w]+$/.test(password)) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_INCORRECT,
        };
    }

    if (!/[A-Z]/.test(password)) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_UPPERCASE,
        };
    }

    if (!/[a-z]/.test(password)) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_LOWERCASE,
        };
    }

    if (!/\d/.test(password)) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_DIGIT,
        };
    }

    if (!/[!@#$%^&*]/.test(password)) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_SPECIAL_SYMBOLS,
        };
    }

    return { isValid: true };
}

/**
 * Проверка совпадения паролей
 * @param {string} password1 password1
 * @param {string}  password2 password2
 * @returns {boolean} `password2 === password2`
 */
export function validatePasswordMatch(password1, password2) {
    return password1 === password2;
}
