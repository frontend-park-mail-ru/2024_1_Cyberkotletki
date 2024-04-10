import { routes, type RoutesValues } from '@/App/App.routes';
import { isRoutesMatch } from '@/Providers/isRoutesMatch';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import type { AppContext } from '@/types/Context.types';

export interface HistoryContextProps {
    changeRoute: (path: string) => void;
}

export const HistoryContext = new Context<AppContext>({
    history: { changeRoute: () => null },
});

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

        this.handleChangeRoute(pathname);

        window.addEventListener('popstate', this.listener);
    }

    handleChangeRoute = (path: string) => {
        const { pathname } = window.location;

        const pathnameWithoutEdgeSlashes = pathname.replace(
            EDGE_SLASHES_REGEXP,
            '',
        );
        const pathWithoutEdgeSlashes = path.replace(EDGE_SLASHES_REGEXP, '');

        if (pathnameWithoutEdgeSlashes !== pathWithoutEdgeSlashes) {
            window.history.pushState(null, '', path);
        }

        const element = this.state.routesMap.get(
            pathWithoutEdgeSlashes,
        )?.element;

        if (element) {
            this.setState((prev) => ({
                ...prev,
                element,
            }));

            return;
        }

        for (const key of this.state.routesMap.keys()) {
            const match = isRoutesMatch(key, pathWithoutEdgeSlashes);

            if (match.match) {
                window.history.replaceState({ params: match.params }, '', path);

                this.setState((prev) => ({
                    ...prev,
                    element: this.state.routesMap.get(key)?.element || <div />,
                }));

                return;
            }
        }

        this.setState((prev) => ({
            ...prev,
            element: this.state.routesMap.get(
                routes.notFound().replace(EDGE_SLASHES_REGEXP, ''),
            )?.element ?? <div />,
        }));
    };

    listener = (event: PopStateEvent) => {
        event.preventDefault();

        const { pathname } = window.location;

        this.handleChangeRoute(pathname);

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
            >
                {this.state.element}
            </HistoryContext.Provider>
        );
    }
}
