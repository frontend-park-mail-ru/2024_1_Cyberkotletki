import { Component } from '../core/src/Component.js';

export class AppRoute {
    /**  @type {string} */
    path;

    /** @type {(props:object)=>Component} */
    renderElement;
}

export class AppRoutes {
    /**
     * @type {Map<string, AppRoute>}
     */
    routesMap;

    /**
     * @param {AppRoute[]} routes Массив с путями
     */
    constructor(routes) {
        this.routesMap = new Map();

        routes.forEach((route) => {
            this.routesMap.set(route.path, route);
        });
    }
}
