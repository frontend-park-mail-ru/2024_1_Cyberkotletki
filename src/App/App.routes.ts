class Routes {
    root = () => '/' as const;

    login = () => '/login' as const;

    register = () => '/register' as const;
}

export const routes = new Routes();
