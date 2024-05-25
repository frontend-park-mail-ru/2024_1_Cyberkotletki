import { routes, type RoutesValues } from '@/App/App.routes';
import { isRoutesMatch } from '@/Providers/isRoutesMatch';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import type { AppContext } from '@/types/Context.types';

export interface HistoryContextValues {
    changeRoute: (
        path: string,
        safeScroll?: boolean,
        replace?: boolean,
    ) => void;
}

export const HistoryContext = new Context<AppContext>({});

export interface HistoryRoute {
    path: RoutesValues;
    element: JSX.Element;
}

export interface HistoryProviderProps {
    router: HistoryRoute[];
}

export interface HistoryProviderState {
    element: JSX.Element;
    routesMap: Map<string, HistoryRoute>;
}

const EDGE_SLASHES_REGEXP = /^\/|\/$/g;

const scrollToTop = () => {
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    });
};

export class HistoryProvider extends AppComponent<
    HistoryProviderProps,
    HistoryProviderState
> {
    constructor(props: HistoryProviderProps) {
        super(props);

        this.state.routesMap = new Map();

        props.router.forEach((route) => {
            this.state.routesMap.set(
                route.path.replace(EDGE_SLASHES_REGEXP, ''),
                route,
            );
        });

        const { pathname } = window.location;

        this.handleChangeRoute(pathname, true, undefined, false);

        window.addEventListener('popstate', this.listener);
    }

    handleChangeRoute = (
        path: string,
        safeScroll?: boolean,
        replace?: boolean,
        changeState = true,
    ) => {
        const { pathname } = window.location;

        const pathnameWithoutEdgeSlashes = pathname.replace(
            EDGE_SLASHES_REGEXP,
            '',
        );
        const pathWithoutEdgeSlashes = path
            .replace(EDGE_SLASHES_REGEXP, '')
            .split(`?`)[0]
            .split(`#`)[0];

        if (
            pathnameWithoutEdgeSlashes !== pathWithoutEdgeSlashes &&
            changeState
        ) {
            if (replace) {
                window.history.replaceState(window.history.state, '', path);
            } else {
                window.history.pushState(window.history.state, '', path);
            }
        }

        const element = this.state.routesMap.get(
            pathWithoutEdgeSlashes,
        )?.element;

        if (element) {
            if (element !== this.state.element) {
                this.setState((prev) => ({ ...prev, element }));

                if (!safeScroll) {
                    scrollToTop();
                }
            }

            return;
        }

        for (const key of this.state.routesMap.keys()) {
            const match = isRoutesMatch(key, pathWithoutEdgeSlashes);

            if (match.match) {
                window.history.replaceState({ params: match.params }, '', path);

                const element =
                    this.state.routesMap.get(key)?.element ||
                    this.state.routesMap.get(routes.notFound())?.element;

                if (element !== this.state.element) {
                    this.setState((prev) => ({
                        ...prev,
                        element: this.state.routesMap.get(key)?.element || (
                            <div />
                        ),
                    }));
                } else if (this.state.element.instance) {
                    const prevProps = this.state.element.instance?.props;
                    const newProps = {
                        ...this.state.element.instance?.props,
                        params: match.params,
                    };

                    this.state.element.instance.props = newProps;

                    this.state.element.instance.componentDidUpdate(
                        this.state.element.instance.state,
                        prevProps,
                    );
                }

                if (!safeScroll) {
                    scrollToTop();
                }

                return;
            }
        }

        const notFound = this.state.routesMap.get(
            routes.notFound().replace(EDGE_SLASHES_REGEXP, ''),
        )?.element;

        if (notFound !== this.state.element) {
            this.setState((prev) => ({
                ...prev,
                element: this.state.routesMap.get(
                    routes.notFound().replace(EDGE_SLASHES_REGEXP, ''),
                )?.element ?? <div />,
            }));
        }
    };

    listener = (event: PopStateEvent) => {
        event.preventDefault();

        const { pathname } = window.location;

        this.handleChangeRoute(pathname, true, undefined, false);

        return false;
    };

    componentWillUnmount() {
        window.removeEventListener('popstate', this.listener);
    }

    contextValue: AppContext = {
        history: { changeRoute: this.handleChangeRoute },
    };

    render() {
        return (
            <HistoryContext.Provider value={this.contextValue}>
                {this.state.element}
            </HistoryContext.Provider>
        );
    }
}
