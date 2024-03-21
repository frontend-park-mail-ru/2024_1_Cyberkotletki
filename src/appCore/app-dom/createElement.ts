import { setAttributes } from '@/appCore/app-dom/setAttributes';
import type { AppNode } from '@/appCore/shared/AppNode.types';
import {
    APP_ELEMENT_TYPE,
    DOM_ELEMENT_TYPE,
} from '@/appCore/shared/AppSymbols';

/**
 * Создает из объекта DOM ноду
 * @param element Объект из которого нужно создать DOM ноду
 * @param owner Элемент, который вызвал создание элемента
 * @returns undefined
 */
export const createElement = (
    element: AppNode,
    owner: HTMLElement | JSX.Element,
): HTMLElement | Text | null => {
    if (typeof element === 'string' || typeof element === 'number') {
        return document.createTextNode(`${element}`);
    }

    if (typeof element === 'boolean' || !element) {
        return null;
    }

    element.owner = owner;

    if (
        element.$$typeof === DOM_ELEMENT_TYPE &&
        typeof element.type === 'string'
    ) {
        const $element = document.createElement(element.type);
        setAttributes($element, element.props);

        element.ref = $element;

        element.props?.children?.forEach((child) => {
            const node = createElement(child, element);

            if (node) {
                $element.appendChild(node);
            }
        });

        return $element;
    }

    if (
        element.$$typeof === APP_ELEMENT_TYPE &&
        typeof element.type === 'function'
    ) {
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
