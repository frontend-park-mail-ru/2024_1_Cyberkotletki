import { AppComponent } from '@/appCore/src/AppComponent';
import { Context } from '@/appCore/src/Context';
import type { AppContext } from '@/types/Context.types';

export interface HistoryContextProps {
    changeRoute: (path: string) => void;
}

export const HistoryContext = new Context<AppContext>({
    history: { changeRoute: () => null },
});

export interface HistoryRoute {
    path: string;
    element: JSX.Element;
}

export interface HistoryProviderProps {
    router: HistoryRoute[];
}

export interface HistoryProviderState {
    element: JSX.Element;
    handleChangeRoute: (path: string) => void;
    routesMap: Map<string, HistoryRoute>;
    listener: (e: PopStateEvent) => void;
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

        this.state.handleChangeRoute = (path: string) => {
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

        const { pathname } = window.location;

        this.state.element = this.state.routesMap.get(pathname)?.element ?? (
            <div>Not found</div>
        );

        this.state.listener = (event) => {
            event.preventDefault();

            this.state.handleChangeRoute(
                (
                    event.currentTarget as unknown as
                        | { location?: Location }
                        | undefined
                )?.location?.pathname ?? '',
            );

            return false;
        };

        window.addEventListener('popstate', this.state.listener);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.state.listener);
    }

    render() {
        return (
            <HistoryContext.Provider
                value={{
                    history: { changeRoute: this.state.handleChangeRoute },
                }}
            >
                {this.state.element}
            </HistoryContext.Provider>
        );
    }
}
