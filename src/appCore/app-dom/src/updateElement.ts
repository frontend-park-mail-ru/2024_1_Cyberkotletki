import {
    appendChildWithCheck,
    isAppElement,
    isChangedElements,
    isDOMElement,
    isElementDefined,
} from './utils';
import { createElement } from './createElement';
import { removeElement } from './removeElement';
import { replaceElements } from './replaceElements';
import { updateAttributes } from './updateAttributes';

import type { AppNode } from '@/appCore/shared/AppNode.types';
import { isPrimitive } from '@/utils';
import { isEqual } from '@/utils/isEqual';

/**
 *
 * @param newNode Новая нода
 * @param oldNode Старая нода
 * @param owner (НЕОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ) родительский DOM элемент,
 * ОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ для изменения ТЕКСТОВОГО УЗЛА
 * @param index позиция oldNode в $parent.
 * ОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ для изменения ТЕКСТОВОГО УЗЛА
 */
export const updateElement = (
    newNode?: AppNode,
    oldNode?: AppNode,
    owner?: JSX.Element | null,
    index?: number,
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
    } else if (!isElementDefined(newNode)) {
        /**
         * ? Случай 2. Нету нового узла.
         * Удаляется старый узел
         */
        removeElement(oldNode, owner);
    } else if (isChangedElements(newNode, oldNode)) {
        /**
         * ? Случай 3. Оба узла есть, но отличаются типом.
         * Старый узел заменяется новым
         */
        replaceElements(newNode, oldNode, owner, index);
    } else if (!isPrimitive(newNode) && !isPrimitive(oldNode)) {
        /**
         * ? Случай 4. Оба узла одинакового типа. Но отличаются параметрами
         * Проверяются и изменяются аттрибуты
         * и следует проверка дочерних элементов
         */
        if (isDOMElement(newNode)) {
            newNode.owner = oldNode.owner;
            newNode.ref = oldNode.ref;

            if (oldNode.ref instanceof HTMLElement) {
                updateAttributes(oldNode.props, newNode.props, oldNode.ref);

                // Дочерние элементы фильтруются.
                // Убираются boolean, null и undefined значения
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
                    updateElement(
                        newChildren?.[i],
                        oldChildren?.[i],
                        oldNode,
                        i,
                    );
                }
            }

            return;
        }

        if (isAppElement(newNode)) {
            const GenerateInstance = newNode.type;

            const instance = new GenerateInstance(newNode.props);
            newNode.instance = instance;

            instance.state = oldNode.instance?.state ?? null;

            const instanceRender = instance.render();

            instance.owner = oldNode.owner;
            instance.instance = instanceRender;

            updateElement(
                instanceRender,
                oldNode.instance?.instance,
                owner,
                index,
            );

            if (!isEqual(oldNode.instance?.props, newNode.instance.props)) {
                instance.componentDidUpdate(
                    instance.state,
                    oldNode.instance?.props ?? null,
                );
            }
        }
    }
};
