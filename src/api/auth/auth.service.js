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
                body: JSON.stringify({ login: email, password }),
                headers: { 'Content-Type': 'application/json' },
            },
            true,
        )
            .then(() => {
                this.setIsLoggedIn(true);
            })
            .catch((error) => {
                this.logout();

                throw error;
            });
    }

    async register(email, password) {
        // await - ожидаем ответа от сервера
        return appFetch(
            authRoutes.register(),
            {
                method: Method.POST,
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: { 'Content-Type': 'application/json' },
            },
            true,
        )
            .then(() => {
                this.setIsLoggedIn(true);
            })
            .catch((error) => {
                this.logout();

                throw error;
            });
    }
}

export const authService = new AuthService();
