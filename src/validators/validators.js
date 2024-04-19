const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 32;
const MAX_REVIEW_TEXT_LENGTH = 10000;
const MAX_REVIEW_TITLE_LENGTH = 50;
const MIN_REVIEW_TEXT_LENGTH = 1;
const MIN_REVIEW_TITLE_LENGTH = 1;

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
};

export const ReviewErrorReasonType = {
    REVIEW_TEXT_SHORT: 'REVIEW_TEXT_SHORT',
    REVIEW_TEXT_LONG: 'REVIEW_TEXT_LONG',
    REVIEW_TITLE_SHORT: 'REVIEW_TITLE_SHORT',
    REVIEW_TITLE_LONG: 'REVIEW_TITLE_LONG',
};


/**
 * Валидация почты
 * @param {string} email почта для проверки
 * @returns {boolean} Валидный ли Email
 */
export function validateEmail(email) {
    return EMAIL_REGEXP.test(email);
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

/**
 * Валидация текста отзыва
 * @param reviewText
 * @returns {{
 * isValid: boolean,
 * reasonType: 'REVIEW_TEXT_SHORT' | 'REVIEW_TEXT_LONG'
 * }} return
 */
export function validateReviewText(reviewText) {
    if (reviewText.length < MIN_REVIEW_TEXT_LENGTH) {
        return {
            isValid: false,
            reasonType: ReviewErrorReasonType.REVIEW_TEXT_SHORT,
        };
    }

    if (reviewText.length > MAX_REVIEW_TEXT_LENGTH) {
        return {
            isValid: false,
            reasonType: ReviewErrorReasonType.REVIEW_TEXT_LONG,
        };
    }

    return { isValid: true };
}

/**
 * Валидация заголовка отзыва
 * @param reviewTitle
 * @returns {{
 * isValid: boolean,
 * reasonType: 'REVIEW_TITLE_SHORT'
 * |'REVIEW_TITLE_LONG'
 * }} return
 */
export function validateReviewTitle(reviewTitle) {
    if (reviewTitle.length < MIN_REVIEW_TITLE_LENGTH) {
        return {
            isValid: false,
            reasonType: ReviewErrorReasonType.REVIEW_TITLE_SHORT,
        };
    }

    if (reviewTitle.length > MAX_REVIEW_TITLE_LENGTH) {
        return {
            isValid: false,
            reasonType: ReviewErrorReasonType.REVIEW_TITLE_LONG,
        };
    }

    return { isValid: true };
}
