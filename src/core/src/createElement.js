import { Component } from './Component.js';
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
            if (element.hasChildNodes()) {
                requestAnimationFrame(() => {
                    element.replaceChildren('');
                });
            }

            requestAnimationFrame(() => {
                children.forEach((child) => {
                    insertChildIntoNode(element, child);
                });
            });
        }

        this.state.element = element;
    }

    /**
     *
     * @param {object} props Пропсы
     * @param {object} state Состояние компонента
     * @param {HTMLElement} state.element Элемент в состоянии
     * @returns {HTMLElement} Узел в дереве
     */
    render(props, state) {
        return state.element;
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
