import { AppRoutes } from '../AppRouter/AppRouter.js';
import { Core } from '../core/Core.js';
import { Component } from '../core/src/Component.js';

export const HistoryContext = Core.createContext({
    changeRoute: (path) => void path,
});

/**
 *
 * @param {HTMLElement} root Родительский компонент
 * @param {AppRoutes} router Роуты
 * @param {string} path Путь
 * @returns {void} Функция
 */
const handleChangeRoute = (root, router, path) => {
    const { pathname } = window.location;

    if (pathname !== path) {
        window.history.pushState(null, '', path);
    }

    if (router.routesMap.has(path)) {
        requestAnimationFrame(() => {
            root.replaceChildren(
                router.routesMap.get(path).renderElement().innerRender(root),
            );
        });
    }
};

class HistoryProviderInner extends Component {
    state = {
        /** @type {Component} */
        element: null,
        /** @param {string} path Путь*/
        handleChangeRoute: (path) => {
            void path;
        },
    };

    componentWillMount() {
        // const { pathname } = window.location;

        // handleChangeRoute(this.owner, this.props.router, pathname);

        window.addEventListener('popstate', (event) => {
            handleChangeRoute(
                this.owner,
                this.props.router,
                event.target.location.pathname,
            );
        });
    }

    /**
     *
     * @param {object} props Пропсы
     * @param {AppRoutes} props.router Роутер
     * @returns {Component|null} Возвращает Component или null
     */
    render(props) {
        const { pathname } = window.location;

        handleChangeRoute(this.owner, props.router, pathname);

        return HistoryContext.Provider({
            changeRoute: (path) =>
                handleChangeRoute(this.owner, props.router, path),
        });
    }
}

/**
 *
 * @param {object} props Пропсы
 * @param {AppRoutes} props.router Роутер
 * @returns {HistoryProviderInner} HistoryProviderInner
 */
export const HistoryProvider = (props) => new HistoryProviderInner(props);
