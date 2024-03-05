import { Component } from '../Component.js';

/**
 *
 * @param {HTMLElement} node Узел, куда добавятся элементы
 * @param {Component|HTMLElement|string|number} child Дочерний элемент
 */
export const insertChildIntoNode = (node, child) => {
    if (child instanceof Node) {
        node.append(child);
    }

    if (typeof child === 'string' || typeof child === 'number') {
        node.append(document.createTextNode(`${child}`));
    }

    if (child instanceof Component) {
        child.innerRender(node);
    }
};
