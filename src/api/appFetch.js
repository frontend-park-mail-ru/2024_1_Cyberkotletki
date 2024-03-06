/* eslint-disable no-console */
import { Method, Credentials, Config } from '../shared/constants.js';

/**
 * Кастомный фетч, который нужен для сохранения сессии пользователя
 * с использованием куки
 * @param url ссылка на ресурс
 * @param options набор опций, который надо установить в фетч
 * @param useCookies флаг true/false, который определяет, сохранять ли куки.
 * По умолчанию куки не сохраняются
 * @returns {Promise<Response>} возвращает фетч
 */
export const appFetch = async (url, options = {}, useCookies = false) => {
    const defaultOptions = {
        method: Method.GET,
        credentials: useCookies ? Credentials.INCLUDE : Credentials.SAME_ORIGIN,
    };

    return fetch(`${Config.BACKEND_URL}${url}`, {
        ...defaultOptions,
        ...options,
    }).then((response) => {
        if (!response.ok || response.status >= 400) {
            console.error(response);
            throw new Error(`${response.status}`);
        }

        return response;
    });
};
