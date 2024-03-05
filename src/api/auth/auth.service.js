import { LocalStorageKey, Method } from '../../shared/constants.js';
import { appFetch } from '../appFetch.js';

import { authRoutes } from './auth.routes.js';

class AuthService {
    /**
     * Сохраняет факт авторизации пользователя в window.localStorage
     * @param {boolean} isLoggedIn если true - то пользователь авторизован,
     * если false - то не авторизован
     */
    setIsLoggedIn(isLoggedIn) {
        window.localStorage.setItem(LocalStorageKey.IS_LOGGED_IN, isLoggedIn);
    }

    /**
     * Проверяет, авторизован ли пользователь
     * @returns {boolean} если true - то пользователь авторизован,
     * если false - то не авторизован
     */
    getIsLoggedIn() {
        const isLoggedIn = window.localStorage.getItem(
            LocalStorageKey.IS_LOGGED_IN,
        );

        if (isLoggedIn === null) {
            return false;
        }

        return Boolean(isLoggedIn);
    }

    /**
     * Удаляет факт авторизации/неавторизации пользователя в authStorage
     */
    logout() {
        if (this.getIsLoggedIn()) {
            window.localStorage.removeItem(LocalStorageKey.IS_LOGGED_IN);
        }
    }

    /**
     * Асинхронная функция для авторизации пользователя
     * @param {string} username Имя пользователя
     * @param {string} password Пароль пользователя
     * @returns {Promise<void>} Promise, который решается, когда процесс
     * авторизации завершен
     */
    async login(username, password) {
        // await - ожидаем ответа от сервера
        const response = await appFetch(
            authRoutes.login(),
            {
                method: Method.POST,
                body: JSON.stringify({ login: username, password }),
                headers: { 'Content-Type': 'application/json' },
            },
            true,
        );

        this.setIsLoggedIn(response.ok);
    }
}

export const authService = new AuthService();
