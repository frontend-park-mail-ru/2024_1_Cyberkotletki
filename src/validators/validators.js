/**
 * Валидация почты
 * @param email {string} почта для проверки
 * @returns {boolean}
 */
export function validateEmail(email) {
    // регулярное выражение для проверки формата электронной почты:
    // строки, которые начинаются с одного или более символов, за
    // которыми следует символ @, за которым следует еще один
    // или более символов, за которыми следует точка и еще один
    // или более символов до конца строки
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

/**
 * Валидация пароля - проверка длины
 * @param password {string} пароль для проверки
 * @returns {boolean}
 */
export function validatePasswordLength(password) {
    return password.length >= 8 && password.length <= 72;
}

/**
 * Проверка совпадения паролей
 * @param {string} password1
 * @param {string}  password2
 * @returns {boolean}
 */
export function validatePasswordMatch(password1, password2) {
    return password1 === password2;
}

/**
 * Валидация пароля - проверка символов в пароле
 * @param password {string} пароль для проверки
 * @returns {boolean}
 */
export function validatePasswordSymbols(password) {
    // проверка наличия как минимум 1 заглавной буквы
    const uppercaseCheck = /[A-Z]/.test(password);
    // проверка наличия как минимум 1 строчной буквы
    const lowercaseCheck = /[a-z]/.test(password);
    // проверка наличия как минимум 1 цифры
    const digitCheck = /\d/.test(password);
    // проверка наличия как минимум 1 спец символа
    const specialCharCheck = /[!@#$%^&*]/.test(password);

    return uppercaseCheck && lowercaseCheck && digitCheck && specialCharCheck;
}
