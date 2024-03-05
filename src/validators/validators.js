/**
 * Валидация почты
 * @param {string} email почта для проверки
 * @returns {boolean} `true` если валидная строка, `false` - если нет
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
 * @param {string} password пароль для проверки
 * @returns {boolean} `true` если пароль валидный, `false` - если нет
 */
export function validatePasswordLength(password) {
    // размер строки в байтах
    const byteSize = new Blob([password]).size;

    return password.length >= 8 && byteSize <= 72;
}

/**
 * Проверка совпадения паролей
 * @param {string} password1 Первый пароль
 * @param {string}  password2 Второй Пароль
 * @returns {boolean} `true` если равны `false` если нет
 */
export const validatePasswordMatch = (password1, password2) =>
    password1 === password2;
