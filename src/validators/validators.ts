const MIN_PASSWORD_LENGTH = 8 as const;
const MAX_PASSWORD_LENGTH = 32 as const;

const PASSWORD_SYMBOLS_REGEXP = /[!@#$%^&*()_+\-=.,]/;
const DIGIT_REGEXP = /\d/;
const LOWERCASE_REGEXP = /[a-z]/;
const UPPERCASE_REGEXP = /[A-Z]/;
const CORRECT_PASSWORD_REGEXP = /^[!@#$%^&*()_+\-=.,\w]+$/;

// регулярное выражение для проверки формата электронной почты:
// строки, которые начинаются с одного или более символов, за
// которыми следует символ @, за которым следует еще один
// или более символов, за которыми следует точка и еще один
// или более символов до конца строки
const EMAIL_STANDARD_REGEXP =
    /^([a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/;

const EMAIL_ANY_REGEXP =
    /^(["].+["]@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/;

export const PasswordErrorReasonType = {
    PASSWORD_SHORT: 'PASSWORD_SHORT',
    PASSWORD_LONG: 'PASSWORD_LONG',
    PASSWORD_INCORRECT: 'PASSWORD_INCORRECT',
    PASSWORD_UPPERCASE: 'PASSWORD_UPPERCASE',
    PASSWORD_LOWERCASE: 'PASSWORD_LOWERCASE',
    PASSWORD_DIGIT: 'PASSWORD_DIGIT',
    PASSWORD_SPECIAL_SYMBOLS: 'PASSWORD_SPECIAL_SYMBOLS',
} as const;

export const ReviewErrorReasonType = {
    REVIEW_TEXT_SHORT: 'REVIEW_TEXT_SHORT',
    REVIEW_TEXT_LONG: 'REVIEW_TEXT_LONG',
    REVIEW_TITLE_SHORT: 'REVIEW_TITLE_SHORT',
    REVIEW_TITLE_LONG: 'REVIEW_TITLE_LONG',
};

export enum PasswordComplexity {
    TOO_SHORT = 'TOO_SHORT',
    TOO_LONG = 'TOO_LONG',
    GOOD = 'GOOD',
    MEDIUM = 'MEDIUM',
    BAD = 'BAD',
}

/**
 * Валидация почты
 * @param {string} email почта для проверки
 * @returns {boolean} Валидный ли Email
 */
export function validateEmail(email: string) {
    return EMAIL_ANY_REGEXP.test(email) || EMAIL_STANDARD_REGEXP.test(email);
}

/**
 * Проверка сложности пароля
 * @param {string} password пароль для проверки
 * @returns тип сложности { PasswordErrorReasonType }
 */
export function checkPassword(password: string) {
    const hasCorrectLength = password.length >= MIN_PASSWORD_LENGTH;

    const testSymbols = PASSWORD_SYMBOLS_REGEXP.test(password);
    const testDigits = DIGIT_REGEXP.test(password);
    const testLowercase = LOWERCASE_REGEXP.test(password);
    const testUppercase = UPPERCASE_REGEXP.test(password);

    switch (true) {
        case !hasCorrectLength:
            return PasswordComplexity.BAD;
        case testSymbols && testDigits && testLowercase && testUppercase:
            return PasswordComplexity.GOOD;
        case testSymbols && (testDigits || testLowercase || testUppercase):
        case testDigits && testLowercase && testUppercase:
        case testLowercase && (testUppercase || testDigits):
        case testUppercase && testDigits:
            return PasswordComplexity.MEDIUM;
        default:
            return PasswordComplexity.BAD;
    }
}

/**
 * Валидация пароля - проверка длины и размера в байтах
 * @param {string} password пароль для проверки
 * @returns isValid: boolean, reasonType: string,
 * complexity: Тип сложности пароля
 */
export function validatePassword(password: string) {
    const complexity = checkPassword(password);

    if (password.length < MIN_PASSWORD_LENGTH) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_SHORT,
            complexity,
        } as const;
    }

    if (password.length > MAX_PASSWORD_LENGTH) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_LONG,
            complexity,
        } as const;
    }

    if (!CORRECT_PASSWORD_REGEXP.test(password)) {
        return {
            isValid: false,
            reasonType: PasswordErrorReasonType.PASSWORD_INCORRECT,
            complexity,
        } as const;
    }

    return {
        isValid: true,
        complexity,
    } as const;
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
