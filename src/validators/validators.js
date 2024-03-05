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
 * Валидация пароля - проверка длины и размера в байтах
 * @param password {string} пароль для проверки
 * @returns {boolean}
 */
export function validatePasswordLength(password) {
    // размер строки в байтах
    const byteSize = new Blob([password]).size;

    return password.length >= 8 && byteSize <= 72;
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
