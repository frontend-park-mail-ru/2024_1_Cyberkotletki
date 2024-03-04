import { AppRoutes } from '../AppRouter/AppRouter.js';
import { Core } from '../core/Core.js';
import { Component, Props } from '../core/src/Component.js';

export class HistoryContextValue {
    changeRoute = (path) => void path;
}

export const HistoryContext = Core.createContext(new HistoryContextValue());

export class HistoryProviderProps extends Props {
    router = new AppRoutes();
}

/**
 *
 * @param {Node} root
 * @param {AppRoutes} router
 * @returns
 */
const handleChangeRoute =
    (root, router) =>
    /**
     *
     * @param {string} path
     * @returns
     */
    (path) => {
        if (
            root instanceof Node &&
            typeof path === 'string' &&
            router instanceof AppRoutes &&
            router.routesMap.has(path)
        ) {
            requestAnimationFrame(() => {
                root.replaceChildren(
                    router.routesMap.get(path).element.innerRender(root),
                );
            });
        }
    };
class HistoryProviderInner extends Component {
    componentWillMount() {
        const { pathname } = window.location;

        handleChangeRoute(this.owner, this.props.router)(pathname);

        window.addEventListener('popstate', (event) => {
            handleChangeRoute(event.target.location.pathname);
        });
    }

    /**
     *
     * @param {HistoryProviderProps|undefined} props
     * @returns
     */
    render(props) {
        return HistoryContext.Provider(
            {
                changeRoute: (path) =>
                    handleChangeRoute(this.owner, props.router)(path),
            },
            ...(props?.children ?? []),
        );
    }
}

/**
 *
 * @param {HistoryProviderProps} props
 * @returns HistoryProviderInner instance
 */
export const HistoryProvider = (props) => new HistoryProviderInner(props);
