import { Component } from '../core/src/Component.js';

export class AppRoute {
    /**
     * @type {string}
     */
    path = '';

    /**
     * @type {Component}
     */
    element;

    /**
     *
     * @param {AppRoute} route
     */
    constructor(route) {
        if (route && typeof route === 'object') {
            if ('path' in route && typeof route.path === 'string') {
                this.path = route.path;
            }

            if ('element' in route && route.element instanceof Component) {
                this.element = route.element;
            }
        }
    }
}

export class AppRoutes {
    /**
     * @type {Map<string, AppRoute>}
     */
    routesMap;

    /**
     *
     * @param {AppRoute[]} routes
     */
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
