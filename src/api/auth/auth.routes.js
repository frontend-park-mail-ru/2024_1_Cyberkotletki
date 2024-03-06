class AuthRoutes {
    /** @returns {string} `/auth/login`*/
    login = () => '/auth/login';

    /** @returns {string} `/auth/login`*/
    register = () => '/auth/register';

    /** @returns {string} `/auth/logout`*/
    logout = () => '/auth/logout';

    /** @returns {string} `/auth/isAuth`*/
    isAuth = () => '/auth/isAuth';
}

export const authRoutes = new AuthRoutes();
