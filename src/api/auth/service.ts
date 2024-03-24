import { authRoutes } from './routes.ts';

import appFetch from '@/api/applicationFetch.ts';
import { AuthError } from '@/api/auth/constants.ts';

interface AuthResponse {
    success: boolean;
    message: string;
}

class AuthService {
    /**
     * Авторизация пользователя
     * @param {string} email Email пользователя
     * @param {string} password Пароль пользователя
     * @returns {Promise<AuthResponse>} Статус операции авторизации
     */
    async login(email: string, password: string): Promise<AuthResponse> {
        return appFetch
            .post(authRoutes.login(), {
                login: email.trim(),
                password,
            })
            .then((r: Response) => {
                if (r.ok) {
                    return { success: true, message: '' };
                }
                switch (r.status) {
                    case 400:
                        return {
                            success: false,
                            message: AuthError.BAD_REQUEST,
                        };
                    case 404:
                        return {
                            success: false,
                            message: AuthError.USER_NOT_FOUND,
                        };
                    case 403:
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
     * @returns {Promise<AuthResponse>} Статус операции регистрации
     */
    async register(email: string, password: string): Promise<AuthResponse> {
        return appFetch
            .post(authRoutes.register(), {
                email: email.trim(),
                password,
            })
            .then((r: Response) => {
                if (r.ok) {
                    return { success: true, message: '' };
                }
                switch (r.status) {
                    case 400:
                        return {
                            success: false,
                            message: AuthError.BAD_REQUEST,
                        };
                    case 409:
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
        return appFetch.post(authRoutes.logout()).then((r: Response) => {
            if (!r.ok) {
                throw new Error('Не удалось выйти из аккаунта');
            }
        });
    }

    /**
     * Проверка авторизации пользователя
     * @returns {Promise<boolean>} true - пользователь авторизован, false - нет
     */
    async isAuth(): Promise<boolean> {
        return appFetch.get(authRoutes.isAuth()).then((r: Response) => r.ok);
    }
}

export const authService = new AuthService();
