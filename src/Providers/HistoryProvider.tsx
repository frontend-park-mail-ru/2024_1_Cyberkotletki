import type { RoutesValues } from '@/App/App.routes';
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

export class HistoryProvider extends AppComponent<
    HistoryProviderProps,
    HistoryProviderState
> {
    constructor(props: HistoryProviderProps) {
        super(props);

        this.state.routesMap = new Map();

        props.router.forEach((route) => {
            this.state.routesMap.set(route.path, route);
        });

        const { pathname } = window.location;

        this.state.element = this.state.routesMap.get(pathname)?.element ?? (
            <div>Not found</div>
        );

        window.addEventListener('popstate', this.listener);
    }

    handleChangeRoute = (path: string) => {
        const { pathname } = window.location;

        if (pathname !== path) {
            window.history.pushState(null, '', path);
        }

        this.setState((prev) => ({
            ...prev,
            element: this.state.routesMap.get(path)?.element ?? (
                <div>Not found</div>
            ),
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
