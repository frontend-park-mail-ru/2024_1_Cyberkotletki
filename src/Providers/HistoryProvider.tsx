import { routes, type RoutesValues } from '@/App/App.routes';
import { isRoutesMatch } from '@/Providers/isRoutesMatch';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import type { AppContext, ContextProps } from '@/types/Context.types';

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

export interface HistoryProviderProps extends ContextProps {
    router: HistoryRoute[];
}

export interface HistoryProviderState {
    element: JSX.Element;
    routesMap: Map<string, HistoryRoute>;
}

const EDGE_SLASHES_REGEXP = /^\/|\/$/g;

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

        this.handleChangeRoute(pathname, true);

        window.addEventListener('popstate', this.listener);
    }

    handleChangeRoute = (
        path: string,
        safeScroll?: boolean,
        replace?: boolean,
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

        if (pathnameWithoutEdgeSlashes !== pathWithoutEdgeSlashes) {
            if (replace) {
                window.history.replaceState(null, '', path);
            } else {
                window.history.pushState(null, '', path);
            }
        }

        const element = this.state.routesMap.get(
            pathWithoutEdgeSlashes,
        )?.element;

        if (element) {
            if (element !== this.state.element) {
                // this.state = { ...this.state, element };
                // this.forceUpdate();

                this.setState((prev) => ({ ...prev, element }));

                if (!safeScroll) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                        });
                    });
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
                    // this.state = {
                    //     ...this.state,
                    //     element: this.state.routesMap.get(key)?.element || (
                    //         <div />
                    //     ),
                    // };

                    // this.forceUpdate();

                    this.setState((prev) => ({
                        ...prev,
                        element: this.state.routesMap.get(key)?.element || (
                            <div />
                        ),
                    }));

                    if (!safeScroll) {
                        setTimeout(() => {
                            window.scrollTo({
                                top: 0,
                                left: 0,
                            });
                        });
                    }
                }

                return;
            }
        }

        const notFound = this.state.routesMap.get(
            routes.notFound().replace(EDGE_SLASHES_REGEXP, ''),
        )?.element;

        if (notFound !== this.state.element) {
            // this.state = {
            //     ...this.state,
            //     element: this.state.routesMap.get(
            //         routes.notFound().replace(EDGE_SLASHES_REGEXP, ''),
            //     )?.element ?? <div />,
            // };
            // this.forceUpdate();

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

        this.handleChangeRoute(pathname, true);

        return false;
    };

    componentWillUnmount() {
        window.removeEventListener('popstate', this.listener);
    }

    render() {
        return (
            <HistoryContext.Provider
                value={{
                    history: { changeRoute: this.handleChangeRoute },
                }}
                context={this.props.context}
            >
                {this.state.element}
            </HistoryContext.Provider>
        );
    }
}
