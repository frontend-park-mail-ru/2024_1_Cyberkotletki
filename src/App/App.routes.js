class Routes {
    /** @returns {string} `/` */
    root = () => '/';

    /** @returns {string} `/login` */
    login = () => '/login';

    /** @returns {string} `/register` */
    register = () => '/register';
}

export const routes = new Routes();
