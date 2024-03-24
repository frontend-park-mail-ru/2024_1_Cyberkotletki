class AuthRoutes {
    login = (): string => '/auth/login';

    register = (): string => '/auth/register';

    logout = (): string => '/auth/logout';

    isAuth = (): string => '/auth/isAuth';
}

export const authRoutes = new AuthRoutes();
