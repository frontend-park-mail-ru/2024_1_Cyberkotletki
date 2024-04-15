class AuthRoutes {
    login = () => '/user/login' as const;

    register = () => '/user/register' as const;

    logout = () => '/auth/logout' as const;

    logoutAll = () => '/auth/logoutAll' as const;

    isAuth = () => '/auth/isAuth' as const;
}

export const authRoutes = new AuthRoutes();
