class AuthRoutes {
    login = (): string => '/auth/login' as const;

    register = (): string => '/auth/register' as const;

    logout = (): string => '/auth/logout' as const;

    isAuth = (): string => '/auth/isAuth' as const;
}

export const authRoutes = new AuthRoutes();
