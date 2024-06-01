import { routes, type RoutesValues } from '@/App/App.routes';
import { isRoutesMatch } from '@/Providers/isRoutesMatch';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import type { AppContext } from '@/types/Context.types';
import type { ParamsProps } from '@/types/ParamsProps.types';

export interface HistoryContextValues {
    changeRoute: (
        path: string,
        replace?: boolean,
        changeState?: boolean,
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

const removeEdgeSlashes = (str: string) => str.replace(EDGE_SLASHES_REGEXP, '');

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
    }

    handleChangeRoute = (
        path: string,
        replace?: boolean,
        changeState = true,
    ) => {
        const { pathname } = window.location;

        const pathnameWithoutEdgeSlashes = removeEdgeSlashes(pathname);
        const pathWithoutEdgeSlashes = removeEdgeSlashes(path)
            .split(`?`)[0]
            .split(`#`)[0];

        if (pathnameWithoutEdgeSlashes !== pathWithoutEdgeSlashes) {
            if (changeState) {
                const state: ParamsProps = {
                    ...(window.history.state as object),
                    scrollY: window.scrollY,
                };

                if (replace) {
                    window.history.replaceState(state, '', path);
                } else {
                    window.history.replaceState(state, '');

                    window.history.pushState(
                        {
                            ...window.history.state,
                            scrollY: 0,
                        },
                        '',
                        path,
                    );
                    scrollToTop();
                }
            }
        }

        if (!changeState) {
            const state = window.history.state as ParamsProps | null;

            setTimeout(() => {
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: state?.scrollY ?? 0,
                        left: 0,
                        behavior: 'instant',
                    });
                });
            });
        }

        const element = this.state.routesMap.get(
            pathWithoutEdgeSlashes,
        )?.element;

        if (element && element !== this.state.element) {
            this.setState((prev) => ({ ...prev, element }));

            return;
        }

        for (const key of this.state.routesMap.keys()) {
            const match = isRoutesMatch(key, pathWithoutEdgeSlashes);

            if (match.match) {
                if (changeState) {
                    window.history.replaceState(
                        {
                            ...window.history.state,
                            params: match.params,
                        } as ParamsProps,
                        '',
                    );
                }

                const element =
                    this.state.routesMap.get(key)?.element ||
                    this.state.routesMap.get(routes.notFound())?.element;

                if (element && element !== this.state.element) {
                    this.setState((prev) => ({
                        ...prev,
                        element,
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

                return;
            }
        }

        const notFound = this.state.routesMap.get(
            routes.notFound().replace(EDGE_SLASHES_REGEXP, ''),
        )?.element;

        if (notFound && notFound !== this.state.element) {
            this.setState((prev) => ({
                ...prev,
                element: notFound,
            }));
        }
    };

    listener = (event: PopStateEvent) => {
        event.preventDefault();

        const { pathname } = window.location;

        this.handleChangeRoute(pathname, false, false);

        return false;
    };

    componentWillUnmount() {
        window.removeEventListener('popstate', this.listener);
    }

    componentDidMount(): void {
        const { pathname } = window.location;

        window.history.scrollRestoration = 'manual';

        this.handleChangeRoute(pathname, false, true);

        window.addEventListener('popstate', this.listener);
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
