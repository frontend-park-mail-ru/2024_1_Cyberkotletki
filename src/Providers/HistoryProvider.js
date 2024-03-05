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
    if (router.routesMap.has(path)) {
        requestAnimationFrame(() => {
            root.replaceChildren(
                router.routesMap.get(path).renderElement().innerRender(root),
            );
        });
    }
};

class HistoryProviderInner extends Component {
    componentWillMount() {
        const changeRoute = (path) =>
            handleChangeRoute(this.owner, this.props.router, path);

        this.state = { changeRoute };

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
