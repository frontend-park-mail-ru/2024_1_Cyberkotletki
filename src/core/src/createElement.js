import { Component } from './Component.js';
import { setAttributes } from './utils/setAttributes.js';

export class AppElement extends Component {
    state = {
        /**
         * @type {Node}
         */
        element: null,
    };

    constructor({ children, tagName, ...props } = {}) {
        super({ children, ...props });

        const element = document.createElement(tagName);

        if (props) {
            setAttributes(element, props);

            if (children && Array.isArray(children) && children.length) {
                requestAnimationFrame(() => {
                    children.forEach((child) => {
                        if (child instanceof Node) {
                            element.appendChild(child);
                        }

                        if (
                            typeof child === 'string' ||
                            typeof child === 'number'
                        ) {
                            element.appendChild(
                                document.createTextNode(`${child}`),
                            );
                        }

                        if (child instanceof Component) {
                            child.innerRender(element);
                        }
                    });
                });
            }
        }

        this.state.element = element;
    }

    render(props, state) {
        return state.element;
    }
}

/**
 *
 * @param {any} value
 * @returns {boolean}
 */
const isChild = (value) =>
    value instanceof Node ||
    value instanceof Component ||
    typeof value === 'string' ||
    typeof value === 'number';

/**
 *
 * @param {string} tagName
 * @param {object} props
 * @returns {AppElement}
 */
export const createElement = (tagName, props, ...children) => {
    if (isChild(props)) {
        const joinedChildren = [
            props,
            ...[...(children ?? [])].filter(isChild),
        ];

        return new AppElement({ children: joinedChildren, tagName });
    }

    if (props && typeof props === 'object' && !props.children?.length) {
        return new AppElement({
            ...props,
            tagName,
            children: [...(children ?? [])].filter(isChild),
        });
    }

    return new AppElement({ tagName, ...props });
};
