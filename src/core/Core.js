import { createElement } from './src/createElement.js';
import { Context } from './src/Context.js';
import { createRoot } from './src/createRoot.js';

class AppCore {
    createElement = createElement;

    createRoot = createRoot;

    /**
     * @param {object} defaultValue Начальное значение
     * @returns {Context} Объект контекста
     */
    createContext(defaultValue) {
        return new Context(defaultValue);
    }
}

export const Core = new AppCore();
