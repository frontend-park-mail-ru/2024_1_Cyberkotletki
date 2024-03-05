class Routes {
    /** @returns {string} `/` */
    root = () => '/';

    /** @returns {string} `/login` */
    login = () => '/login';

    /** @returns {string} `/register` */
    register = () => '/register';

    /** @returns {string} `/index` */
    index = () => '/index';
}

export const routes = new Routes();
