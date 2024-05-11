import { setAttributes } from './setAttributes';
import {
    appendChildWithCheck,
    isAppElement,
    isDOMElement,
    isElementDefined,
    isTextNode,
} from './utils';

import { isFunction } from '@/utils';
import type { AppNode } from '@/core/shared/AppNode.types';

/**
 * Создает из объекта DOM ноду
 * @param element Объект из которого нужно создать DOM ноду
 * @param owner Элемент, который вызвал создание элемента
 * @returns undefined
 */
export const createElement = (
    element: AppNode,
    owner: JSX.Element | null,
): HTMLElement | Text | null => {
    if (isTextNode(element)) {
        return document.createTextNode(`${element}`);
    }

    if (!isElementDefined(element)) {
        return null;
    }

    element.owner = owner;

    if (isDOMElement(element)) {
        const $element = document.createElement(element.type);
        setAttributes($element, element.props);

        element.ref = $element;

        const { ref } = element.props ?? {};

        if (isFunction(ref)) {
            ref($element);
        } else if (ref) {
            ref.current = $element;
        }

        element.props?.children?.forEach((child) => {
            const node = createElement(child, element);

            appendChildWithCheck($element, node);
        });

        return $element;
    }

    if (isAppElement(element)) {
        const GenerateInstance = element.type;

        const instance = new GenerateInstance(element.props);
        element.instance = instance;

        instance.componentWillMount();

        const instanceRender = instance.render();
        const $element = createElement(instanceRender, element);

        element.ref = $element;
        instance.ref = $element;
        instance.owner = owner;
        instance.instance = instanceRender;
        instance.componentDidMount();

        return $element;
    }

    return null;
};
