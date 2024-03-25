import { createElement } from './createElement';
import {
    getTextNode,
    getParentNodeFromElement,
    replaceChildWithCheck,
    isTextNode,
    isElementDefined,
    isDOMElement,
    isAppElement,
} from './utils';
import { removeElement } from './removeElement';

import type { AppNode } from '@/appCore/shared/AppNode.types';
import { isDefined } from '@/utils';

/**
 * Замена элементов местами
 * @param newNode Новая нода
 * @param oldNode Старая нода
 * @param owner (НЕОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ) родительский DOM элемент,
 * ОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ для изменения ТЕКСТОВОГО УЗЛА
 * @param index позиция oldNode в $parent.
 * ОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ для изменения ТЕКСТОВОГО УЗЛА
 */
export const replaceElements = (
    newNode?: AppNode,
    oldNode?: AppNode,
    owner?: JSX.Element | null,
    index?: number,
) => {
    if (isTextNode(oldNode)) {
        const $parent = getParentNodeFromElement(owner);

        const textChild = isDefined(index)
            ? $parent?.childNodes[index]
            : getTextNode($parent, oldNode);

        const $element = createElement(newNode, owner ?? null);

        requestAnimationFrame(() => {
            replaceChildWithCheck(textChild, $element);
        });

        return;
    }

    if (!isElementDefined(oldNode)) {
        return;
    }

    if (isDOMElement(oldNode)) {
        const children = oldNode.props?.children;

        const { ref } = oldNode;

        const $element = createElement(newNode, oldNode.owner);

        requestAnimationFrame(() => {
            children?.forEach((child) => {
                removeElement(child, oldNode);
            });
        });

        requestAnimationFrame(() => {
            replaceChildWithCheck(ref, $element);
        });

        return;
    }

    if (isAppElement(oldNode)) {
        oldNode.instance?.componentWillUnmount();

        const $element = createElement(newNode, oldNode.owner);

        requestAnimationFrame(() => {
            replaceChildWithCheck(oldNode.instance?.ref, $element);

            removeElement(oldNode.instance?.instance);
            oldNode.instance?.unmount();
        });
    }
};
