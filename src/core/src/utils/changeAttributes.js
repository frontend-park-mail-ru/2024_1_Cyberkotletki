import { ComponentEvent } from '../constants';

/**
 *
 * @param {object} prevProps Prev props
 * @param {object} nextProps Next props
 * @param {HTMLElement} node Node
 */
export const changeAttributes = (prevProps, nextProps, node) => {
    const eventKeys = Object.keys(ComponentEvent);

    Object.entries(prevProps).forEach(([key, value]) => {
        if (eventKeys.includes(key) && value !== nextProps?.[key]) {
            node.removeEventListener(ComponentEvent[key], value);

            return;
        }

        if (!nextProps[key]) {
            node.removeAttribute(key);
        }
    });

    Object.entries(nextProps).forEach(([key, value]) => {
        if (eventKeys.includes(key) && value !== prevProps?.[key]) {
            node.addEventListener(ComponentEvent[key], value);

            return;
        }

        if (prevProps[key] !== value && value) {
            node.setAttribute(key, value);
        }
    });
};
