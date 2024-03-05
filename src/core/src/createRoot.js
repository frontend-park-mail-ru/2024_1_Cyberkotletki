import { Component } from './Component.js';
import { insertChildIntoNode } from './utils/insertChildIntoNode.js';

/**
 *
 * @param {HTMLElement} root Корневой узел
 * @param  {...Component|HTMLElement|string|number} children Дочерние элементы
 */
export const createRoot = (root, ...children) => {
    const renderChildren = () => {
        requestAnimationFrame(() => {
            children.forEach((child) => {
                insertChildIntoNode(root, child);
            });
        });
    };

    if (document.readyState !== 'loading') {
        renderChildren();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            renderChildren();
        });
    }
};
