/**
 * Кастомный фетч, который нуэен для сохранения сессии пользователя
 * с использованием куки
 * @param {string} url ссылка на ресурс
 * @param {object} options набор опций, который надо установить в фетч
 * @param {boolean} useCookies флаг `true/false`,
 * который определяет, сохранять ли куки.
 * По умолчанию куки не сохраняются
 * @returns {Promise<Response>} возвращает фетч
 */
export async function customFetch(url, options = {}, useCookies = false) {
    const defaultOptions = {
        method: 'GET',
        credentials: useCookies ? 'include' : 'same-origin',
    };

    return fetch(url, { ...defaultOptions, ...options });
}
