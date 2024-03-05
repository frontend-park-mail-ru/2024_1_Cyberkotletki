import { AuthContext } from '../Providers/AuthContext.js';

import { customFetch } from './fetch.js';

class Auth {
    authStorage;

    /**
     * В authStorage хранится факт авторизации пользователя в формате:
     * ('isLoggedIn', bool)
     */
    constructor() {
        this.authStorage = window.localStorage;
    }

    /**
     * Сохраняет факт авторизации пользователя в authStorage
     * @param {boolean} isLoggedIn если true - то пользователь авторизован,
     * если false - то не авторизован
     */
    saveAuthStatus(isLoggedIn) {
        this.authStorage.setItem('isLoggedIn', isLoggedIn);
        AuthContext.Provider({ authStatus: isLoggedIn });
    }

    /**
     * Проверяет, авторизован ли пользователь
     * @returns {boolean} если true - то пользователь авторизован,
     * если false - то не авторизован
     */
    isAuth() {
        const isLoggedIn = this.authStorage.getItem('isLoggedIn');

        if (isLoggedIn === null) {
            AuthContext.Provider({ authStatus: false });

            return false;
        }

        const isUserLoggedIn = Boolean(isLoggedIn);
        AuthContext.Provider({ authStatus: isUserLoggedIn });

        return isUserLoggedIn;
    }

    /**
     * Удаляет факт авторизации/ неавторизации пользователя в authStorage
     */
    deleteAuth() {
        if (this.isAuth()) {
            this.authStorage.removeItem('isLoggedIn');
            AuthContext.Provider({ authStatus: false });
        }
    }

    /**
     * Асинхронная функция для авторизации пользователя
     * @param {string} username Имя пользователя
     * @param {string} password Пароль пользователя
     * @returns {Promise<void>} Promise, который решается, когда процесс
     * авторизации завершен
     */
    async Login(username, password) {
        // await - ожидаем ответа от сервера
        const response = await customFetch(
            '/auth/login',
            {
                method: 'POST',
                body: JSON.stringify({ login: username, password }),
                headers: { 'Content-Type': 'application/json' },
            },
            true,
        );

        if (response.ok) {
            this.saveAuthStatus(true);
        } else {
            this.saveAuthStatus(false);
        }
    }
}
