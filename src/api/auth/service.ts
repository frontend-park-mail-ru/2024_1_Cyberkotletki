import { authRoutes } from './routes.ts';

import { appFetch, ResponseError } from '@/api/appFetch.ts';
import { AuthError } from '@/api/auth/constants.ts';
import { ResponseStatus } from '@/shared/constants';

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
     * Авторизация пользователя. Если авторизация не удалась, то выбрасывается
     * ошибка
     * @param {string} email Email пользователя
     * @param {string} password Пароль пользователя
     * @returns {Promise<void>}
     */
    async login(email: string, password: string) {
        return appFetch
            .post<LoginPayload, void>(authRoutes.login(), {
                login: email.trim(),
                password,
            })
            .catch((error: Error) => {
                if (error instanceof ResponseError) {
                    switch (error.message) {
                        case ResponseStatus.BAD_REQUEST:
                            throw new Error(AuthError.BAD_REQUEST);
                        case ResponseStatus.NOT_FOUND:
                            throw new Error(AuthError.USER_NOT_FOUND);
                        case ResponseStatus.FORBIDDEN:
                            throw new Error(AuthError.PASSWORD_INCORRECT);
                        default:
                            throw new Error(AuthError.UNKNOWN_ERROR);
                    }
                }
                throw error;
            });
    }

    /**
     * Регистрация пользователя. Если регистрация не удалась, то выбрасывается
     * ошибка
     * @param email Email пользователя
     * @param password Пароль пользователя
     * @returns {Promise<void>}
     */
    async register(email: string, password: string): Promise<void> {
        return appFetch
            .post<RegisterPayload, void>(authRoutes.register(), {
                email: email.trim(),
                password,
            })
            .catch((error: Error) => {
                if (error instanceof ResponseError) {
                    switch (error.message) {
                        case ResponseStatus.BAD_REQUEST:
                            throw new Error(AuthError.BAD_REQUEST);
                        case ResponseStatus.CONFLICT:
                            throw new Error(AuthError.USER_ALREADY_EXISTS);
                        default:
                            throw new Error(AuthError.UNKNOWN_ERROR);
                    }
                }
                throw error;
            });
    }

    /**
     * Функция для выхода пользователя из системы. Если выход не удался,
     * то выбрасывается ошибка. В противном случае можно считать, что юзер
     * вышел и cookies удалены
     * @returns {Promise<void>}
     * то возвращает ошибку
     */
    async logout(): Promise<void> {
        return appFetch
            .post<void, void>(authRoutes.logout())
            .catch((error: Error) => {
                if (error instanceof ResponseError) {
                    throw new Error(AuthError.UNSUCCESSFUL_LOGOUT);
                }
                throw error;
            });
    }

    /**
     * Проверка авторизации пользователя
     * @returns {Promise<boolean>} true - пользователь авторизован, false - нет
     */
    async isAuth(): Promise<boolean> {
        return appFetch.get(authRoutes.isAuth());
    }
}

export const authService = new AuthService();
