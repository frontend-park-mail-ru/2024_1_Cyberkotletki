import { authRoutes } from './routes.ts';

import appFetch, { ResponseStatus } from '@/api/applicationFetch.ts';
import { AuthError } from '@/api/auth/constants.ts';

interface RegisterPayload {
    email: string;
    password: string;
}

interface LoginPayload {
    login: string;
    password: string;
}

class AuthService {
    /**
     * Авторизация пользователя
     * @param {string} email Email пользователя
     * @param {string} password Пароль пользователя
     * @returns {Promise<{
     *     success: boolean;
     *     message: string;
     * }>} Статус операции авторизации
     */
    async login(
        email: string,
        password: string,
    ): Promise<{
        success: boolean;
        message: string;
    }> {
        return appFetch
            .post<LoginPayload, string>(authRoutes.login(), {
                login: email.trim(),
                password,
            })
            .then((response) => {
                switch (response.status) {
                    case ResponseStatus.OK:
                        return {
                            success: true,
                            message: '',
                        };
                    case ResponseStatus.BAD_REQUEST:
                        return {
                            success: false,
                            message: AuthError.BAD_REQUEST,
                        };
                    case ResponseStatus.NOT_FOUND:
                        return {
                            success: false,
                            message: AuthError.USER_NOT_FOUND,
                        };
                    case ResponseStatus.FORBIDDEN:
                        return {
                            success: false,
                            message: AuthError.PASSWORD_INCORRECT,
                        };
                    default:
                        return {
                            success: false,
                            message: AuthError.UNKNOWN_ERROR,
                        };
                }
            });
    }

    /**
     * Регистрация пользователя
     * @param email Email пользователя
     * @param password Пароль пользователя
     * @returns {Promise<{
     *         success: boolean;
     *         message: string;
     *     }>} Статус операции регистрации
     */
    async register(
        email: string,
        password: string,
    ): Promise<{
        success: boolean;
        message: string;
    }> {
        return appFetch
            .post<RegisterPayload, string>(authRoutes.register(), {
                email: email.trim(),
                password,
            })
            .then((response) => {
                switch (response.status) {
                    case ResponseStatus.OK:
                        return {
                            success: true,
                            message: '',
                        };
                    case ResponseStatus.BAD_REQUEST:
                        return {
                            success: false,
                            message: AuthError.BAD_REQUEST,
                        };
                    case ResponseStatus.CONFLICT:
                        return {
                            success: false,
                            message: AuthError.USER_ALREADY_EXISTS,
                        };
                    default:
                        return {
                            success: false,
                            message: AuthError.UNKNOWN_ERROR,
                        };
                }
            });
    }

    /**
     * Функция для выхода пользователя из системы
     * @returns {Promise<void>} если не удалось выйти из системы,
     * то возвращает ошибку
     */
    async logout(): Promise<void> {
        return appFetch
            .post<object, string>(authRoutes.logout())
            .then((response) => {
                if (response.status !== ResponseStatus.OK) {
                    throw new Error('Не удалось выйти из аккаунта');
                }
            });
    }

    /**
     * Проверка авторизации пользователя
     * @returns {Promise<boolean>} true - пользователь авторизован, false - нет
     */
    async isAuth(): Promise<boolean> {
        return appFetch
            .get<string>(authRoutes.isAuth())
            .then((response) => response.status === ResponseStatus.OK);
    }
}

export const authService = new AuthService();
