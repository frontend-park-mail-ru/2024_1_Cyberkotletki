import {
    appendChildWithCheck,
    generateInstance,
    isAppElement,
    isChangedElements,
    isDOMElement,
    isElementDefined,
} from './utils';
import { createElement } from './createElement';
import { removeElement } from './removeElement';
import { replaceElements } from './replaceElements';
import { updateAttributes } from './updateAttributes';

import type { AppNode } from '@/core/shared/AppNode.types';
import { isPrimitive } from '@/utils';

/**
 * Сравнивает старый и новый узел, и,
 * если необходимо, делает изменения
 * @param newNode Новая нода
 * @param oldNode Старая нода
 * @param owner (НЕОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ) родительский DOM элемент,
 * ОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ для изменения ТЕКСТОВОГО УЗЛА
 * @param index позиция oldNode в $parent.
 * ОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ для изменения ТЕКСТОВОГО УЗЛА
 * @param isForce  isForce
 * @returns {HTMLElement|null} Элемент
 */
export const updateElement = (
    newNode?: AppNode,
    oldNode?: AppNode,
    owner?: JSX.Element | null,
    index?: number,
    isForce?: boolean,
) => {
    if (!isElementDefined(oldNode)) {
        /**
         * ? Случай 1. Нету предыдущего узла.
         * Создается новый элемент и добавляется к родительскому
         */
        const $element = createElement(newNode, owner ?? null);

        requestAnimationFrame(() => {
            appendChildWithCheck(owner, $element);
        });

        return $element;
    }

    if (!isElementDefined(newNode)) {
        /**
         * ? Случай 2. Нету нового узла.
         * Удаляется старый узел
         */
        removeElement(oldNode, owner);

        return null;
    }

    if (isChangedElements(newNode, oldNode)) {
        /**
         * ? Случай 3. Оба узла есть, но отличаются типом.
         * Старый узел заменяется новым
         */

        return replaceElements(newNode, oldNode, owner, index);
    }

    if (!isPrimitive(newNode) && !isPrimitive(oldNode)) {
        /**
         * ? Случай 4. Оба узла одинакового типа. Но отличаются параметрами
         * Проверяются и изменяются аттрибуты
         * и следует проверка дочерних элементов
         */
        if (isDOMElement(newNode)) {
            newNode.owner = oldNode.owner;
            newNode.ref = oldNode.ref;
            newNode.instance = oldNode.instance;

            if (oldNode.ref instanceof HTMLElement) {
                updateAttributes(oldNode.props, newNode.props, oldNode.ref);

                // Дочерние элементы фильтруются.
                // Убираются boolean, null, undefined и "" значения
                const newChildren =
                    newNode.props?.children?.filter(isElementDefined);
                const oldChildren =
                    oldNode.props?.children?.filter(isElementDefined);

                // Берется наибольшая длина, чтобы точно пройтись
                // по всем новым и старым элементам
                const maxChildLength = Math.max(
                    newChildren?.length ?? 0,
                    oldChildren?.length ?? 0,
                );

                for (let i = 0; i < maxChildLength; i++) {
                    const newChild = newChildren?.[i];

                    updateElement(
                        newChild,
                        oldChildren?.[i],
                        oldNode,
                        i,
                        isForce,
                    );
                }
            }

            return oldNode.ref;
        }

        if (isAppElement(newNode)) {
            newNode.owner = oldNode.owner;

            const instance = generateInstance(newNode);

            if (
                isForce ||
                oldNode.instance?.componentShouldUpdate(
                    instance.props,
                    oldNode.instance.state,
                )
            ) {
                instance.state = oldNode.instance?.state ?? {};
                const instanceRender = instance.render();
                instance.instance = instanceRender;
                instance.owner = oldNode.owner;

                newNode.instance = instance;

                updateElement(
                    instanceRender,
                    oldNode.instance?.instance,
                    owner,
                    index,
                    isForce,
                );

                newNode.ref = isPrimitive(instanceRender)
                    ? null
                    : instanceRender.ref;
                instance.ref = newNode.ref;

                instance.componentDidUpdate(
                    instance.state,
                    oldNode.instance?.props ?? null,
                );

                return newNode.ref;
            }

            newNode.instance = oldNode.instance;
            newNode.ref = oldNode.ref;

            return oldNode.ref;
        }

        return owner?.ref?.childNodes[index ?? 0] as HTMLElement;
    }

    return owner?.ref?.childNodes[index ?? 0] as HTMLElement;
};
