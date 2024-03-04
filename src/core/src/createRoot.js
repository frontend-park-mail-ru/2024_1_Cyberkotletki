import { Component } from './Component.js';

/**
 *
 * @param {Node} root
 * @param  {...Component} children
 */

export const createRoot = (root, ...children) => {
    if (root instanceof Node) {
        children.forEach((child) => {
            if (child instanceof Component) {
                child.innerRender(root);
            }
        });
    }
};
