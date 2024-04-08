class AuthRoutes {
    login = () => '/auth/login' as const;

    register = () => '/auth/register' as const;

    logout = () => '/auth/logout' as const;

    isAuth = () => '/auth/isAuth' as const;
}

export const authRoutes = new AuthRoutes();
