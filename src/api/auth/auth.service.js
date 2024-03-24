import { Method } from '../../shared/constants.js';
import { appFetch } from '../appFetch.js';

import { authRoutes } from './auth.routes.js';

/**
 * Сервис работе с авторизацией
 */
class AuthService {
    /**
     * Асинхронная функция для авторизации пользователя
     * @param {string} email Email пользователя
     * @param {string} password Пароль пользователя
     * @returns {Promise<void>} Promise, который решается, когда процесс
     * авторизации завершен
     */
    async login(email, password) {
        // await - ожидаем ответа от сервера
        return appFetch(
            authRoutes.login(),
            {
                method: Method.POST,
                body: JSON.stringify({ login: email.trim(), password }),
                headers: { 'Content-Type': 'application/json' },
            },
            true,
        );
    }

    /**
     * Запрос регистрации
     * @param {string} email Email
     * @param {string} password Пароль
     * @returns {Promise<Response>} Ответ от сервера
     */
    async register(email, password) {
        // await - ожидаем ответа от сервера
        return appFetch(
            authRoutes.register(),
            {
                method: Method.POST,
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
                headers: { 'Content-Type': 'application/json' },
            },
            true,
        );
    }

    /**
     * Запрос разлогирования
     */
    async logout() {
        // await - ожидаем ответа от сервера
        await appFetch(
            authRoutes.logout(),
            {
                method: Method.POST,
                headers: { 'Content-Type': 'application/json' },
            },
            true,
        );
    }

    /**
     * Запрос на проверку аутентификации
     */
    async isAuth() {
        // await - ожидаем ответа от сервера
        await appFetch(
            authRoutes.isAuth(),
            {
                method: Method.GET,
                headers: { 'Content-Type': 'application/json' },
            },
            true,
        );
    }
}

export const authService = new AuthService();
