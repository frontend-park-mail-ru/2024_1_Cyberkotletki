import { Component } from './Component.js';

export class Context {
    value;

    /** @param {object} value Начальное значение контекста*/
    constructor(value) {
        this.value = value;
    }

    /**
     * @param {object} value Значение контекста
     * @param {Array<Component|HTMLElement|string|number>} children
     * Дочерние элементы
     * @returns {Component|null} Возвращает `Component` или `null`
     */
    Provider(value, ...children) {
        this.value = value;

        if (children.length) {
            return new Component({ children });
        }

        return null;
    }

    /**
     *
     * @param {(props:object)=>Component} renderElement
     * Функция, возвращающая `Component`
     * @returns {Component} `Component`
     */
    Connect(renderElement) {
        return (props) =>
            renderElement({
                ...props,
                context: { ...(props?.context ?? {}), ...this.value },
            });
    }

    contextDidChange() {}
}
