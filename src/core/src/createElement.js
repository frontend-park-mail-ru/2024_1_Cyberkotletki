import { Component } from './Component.js';
import { changeAttributes } from './utils/changeAttributes.js';
import { changeChildren } from './utils/changeChildren.js';
import { insertChildIntoNode } from './utils/insertChildIntoNode.js';
import { isChild } from './utils/isChild.js';
import { setAttributes } from './utils/setAttributes.js';

export class AppElement extends Component {
    state = {
        /** @type {HTMLElement}*/
        element: null,
    };

    constructor({ children, tagName, context, ...props }) {
        super({ children, tagName, context, ...props });

        const element = document.createElement(tagName);

        if (props) {
            setAttributes(element, props);
        }

        if (children?.length) {
            requestAnimationFrame(() => {
                children.forEach((child) => {
                    insertChildIntoNode(element, child);
                });
            });
        }

        this.element = element;
    }

    render({ children, tagName, context, ...props }) {
        if (props) {
            changeAttributes(this.props, props, this.element);
        }

        if (children?.length) {
            changeChildren(this.props.children, children, this.element);
        }

        this.props = { children, tagName, context, ...props };

        return this.element;
    }
}

/**
 *
 * @param {string} tagName Название тэга `a`, `div`...
 * @param {object|undefined} props Атрибуты элемента
 * @param {...any} children Дочерние элементы
 * @returns {AppElement} Компонент
 */
export const createElement = (tagName, props, ...children) => {
    if (isChild(props)) {
        return new AppElement({
            children: [props, ...[...(children ?? [])].filter(isChild)],
            tagName,
        });
    }

    if (props && !props.children?.length && children.length) {
        return new AppElement({
            ...props,
            tagName,
            children: [...children].filter(isChild),
        });
    }

    return new AppElement({ tagName, ...props });
};
