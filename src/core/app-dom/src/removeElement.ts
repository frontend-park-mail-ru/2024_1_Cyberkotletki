import {
    getParentNodeFromElement,
    getTextNode,
    isElementDefined,
    isTextNode,
} from './utils';

import type { AppNode } from '@/core/shared/AppNode.types';
import { DOM_ELEMENT_TYPE } from '@/core/shared/AppSymbols';
import { isDefined } from '@/utils';

/**
 * Удаляет элемент
 * @param element Элемент, который нужно удалить
 * @param owner (НЕОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ) родительский DOM элемент,
 * ОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ для изменения ТЕКСТОВОГО УЗЛА
 * @param index позиция oldNode в $parent.
 * ОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ для изменения ТЕКСТОВОГО УЗЛА
 */
export const removeElement = (
    element?: AppNode,
    owner?: JSX.Element | null,
    index?: number,
) => {
    if (isTextNode(element)) {
        const $parent = getParentNodeFromElement(owner);

        const textChild = isDefined(index)
            ? $parent?.childNodes[index]
            : getTextNode($parent, element);

        textChild?.remove();

        return;
    }

    if (!isElementDefined(element)) {
        return;
    }

    if (element.$$typeof === DOM_ELEMENT_TYPE) {
        const children = element.props?.children;

        // Производится удаление дочерних элементов для того,
        // чтобы вызвать функции жизненного цикла компонентов,
        // если они имеются
        // requestAnimationFrame(() => {
        children?.forEach((child, index) => {
            removeElement(child, element, index);
        });
        // });

        const { ref } = element;

        ref?.remove();

        return;
    }

    if (element.instance) {
        element.instance.componentWillUnmount();
        removeElement(element.instance.instance, element.instance.owner);
        element.instance.unmount();
    }
};
