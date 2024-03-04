import { Component } from './Component.js';

/**
 *
 * @param {Node} root
 * @param  {...Component} children
 */

export const createRoot = (root, ...children) => {
    const renderChildren = () => {
        if (root instanceof Node) {
            children.forEach((child) => {
                if (child instanceof Component) {
                    child.innerRender(root);
                }
            });
        }
    };

    if (document.readyState !== 'loading') {
        renderChildren();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            renderChildren();
        });
    }
};
