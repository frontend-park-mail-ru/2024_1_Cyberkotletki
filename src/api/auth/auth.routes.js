class AuthRoutes {
    /** @returns {string} `/auth/login`*/
    login = () => '/auth/login';

    /** @returns {string} `/auth/login`*/
    register = () => '/auth/register';
}

export const authRoutes = new AuthRoutes();
