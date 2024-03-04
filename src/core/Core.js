import { createElement } from './src/createElement.js';
import { Context } from './src/Context.js';
import { createRoot } from './src/createRoot.js';

class AppCore {
    createElement;

    createRoot;

    /**
     *
     * @param {Object} defaultValue
     * @returns {Context}
     */
    createContext(defaultValue) {
        void defaultValue;
    }

    constructor() {
        this.createElement = createElement;
        this.createRoot = createRoot;
        this.createContext = (defaultValue) => new Context(defaultValue);
    }
}

export const Core = new AppCore();
