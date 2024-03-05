/**
 * Кастомный фетч, который нуэен для сохранения сессии пользователя
 * с использованием куки
 * @param url ссылка на ресурс
 * @param options набор опций, который надо установить в фетч
 * @param useCookies флаг true/false, который определяет, сохранять ли куки.
 * По умолчанию куки не сохраняются
 * @returns {Promise<Response>} возвращает фетч
 */
export function customFetch(url, options = {}, useCookies = false) {
    const defaultOptions = {
        method: 'GET',
        credentials: useCookies ? 'include' : 'same-origin',
    };

    return fetch(url, { ...defaultOptions, ...options });
}
