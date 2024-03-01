import { AppRoutes } from '../AppRouter/AppRouter.js';
import { Context } from '../context/Context.js';

export const HistoryContext = new Context({
    changeRoute: (path) => void path,
});

export const HistoryProvider = ({ router }, children) => {
    const { pathname } = window.location;

    const handleChangeRoute = (path) => {
        if (
            typeof path === 'string' &&
            router instanceof AppRoutes &&
            router.routesMap.has(path)
        ) {
            const root = document.getElementById('root');

            requestAnimationFrame(() => {
                while (root.lastChild) {
                    root.lastChild.remove();
                }

                requestAnimationFrame(() => {
                    root.append(router.routesMap.get(path).element);
                });
            });
        }
    };

    handleChangeRoute(pathname);

    window.addEventListener('popstate', (event) => {
        handleChangeRoute(event.target.location.pathname);
    });

    return HistoryContext.Provider(
        { changeRoute: handleChangeRoute },
        children,
    );
};
