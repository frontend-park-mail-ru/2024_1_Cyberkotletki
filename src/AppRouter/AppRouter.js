export class AppRoute {
    path = '';

    element = null;

    constructor(route) {
        if (route && typeof route === 'object') {
            if ('path' in route && typeof route.path === 'string') {
                this.path = route.path;
            }

            if ('element' in route && route.element instanceof HTMLElement) {
                this.element = route.element;
            }
        }
    }
}

export class AppRoutes {
    routesMap = new Map([['', new AppRoute()]]);

    constructor(routes) {
        this.routesMap = new Map();

        if (Array.isArray(routes)) {
            routes.forEach((route) => {
                const appRoute = new AppRoute(route);

                this.routesMap.set(appRoute.path, appRoute);

                return appRoute;
            });
        }
    }
}
