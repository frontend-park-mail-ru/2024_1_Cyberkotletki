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

        if (!isPrimitive(newNode)) {
            newNode.props.context = {
                ...owner?.props.context,
                ...newNode.props.context,
            };
        }
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

        if (!isPrimitive(newNode)) {
            newNode.props.context = {
                ...owner?.props.context,
                ...newNode.props.context,
            };
        }

        return replaceElements(newNode, oldNode, owner, index);
    }

    if (!isPrimitive(newNode) && !isPrimitive(oldNode)) {
        const oldNodeCopy = { ...oldNode };
        oldNodeCopy.props = { ...oldNode.props };
        newNode.props.context = {
            ...owner?.props.context,
            ...newNode.props.context,
        };
        newNode.owner = { ...oldNodeCopy.owner } as JSX.Element;

        /**
         * ? Случай 4. Оба узла одинакового типа. Но отличаются параметрами
         * Проверяются и изменяются аттрибуты
         * и следует проверка дочерних элементов
         */
        if (isDOMElement(newNode)) {
            newNode.ref = oldNodeCopy.ref;
            newNode.instance = oldNodeCopy.instance;

            if (oldNodeCopy.ref instanceof HTMLElement) {
                updateAttributes(
                    oldNodeCopy.props,
                    newNode.props,
                    oldNodeCopy.ref,
                );

                // Дочерние элементы фильтруются.
                // Убираются boolean, null, undefined и "" значения
                const newChildren =
                    newNode.props?.children?.filter(isElementDefined);
                const oldChildren =
                    oldNodeCopy.props?.children?.filter(isElementDefined);

                // Берется наибольшая длина, чтобы точно пройтись
                // по всем новым и старым элементам
                const maxChildLength = Math.max(
                    newChildren?.length ?? 0,
                    oldChildren?.length ?? 0,
                );

                for (let i = 0; i < maxChildLength; i++) {
                    const newChild = newChildren?.[i];
                    const oldChild = oldChildren?.[i];

                    if (!isPrimitive(newChild)) {
                        newChild.props.context = {
                            ...newNode.props?.context,
                            ...newChild.props?.context,
                        };
                    }

                    updateElement(newChild, oldChild, oldNodeCopy, i, isForce);
                }
            }

            return oldNodeCopy.ref;
        }

        if (isAppElement(newNode)) {
            const GenerateInstance = newNode.type;

            const instance = new GenerateInstance(newNode.props ?? {});

            if (
                isForce ||
                oldNodeCopy.instance?.componentShouldUpdate(
                    instance.props,
                    oldNodeCopy.instance.state,
                )
            ) {
                instance.state = oldNodeCopy.instance?.state ?? {};
                const instanceRender = instance.render();
                instance.instance = instanceRender;
                instance.owner = { ...oldNodeCopy.owner } as JSX.Element;

                newNode.instance = instance;

                if (
                    !isPrimitive(oldNodeCopy.instance?.instance) &&
                    oldNodeCopy.instance?.instance.props
                ) {
                    oldNodeCopy.instance.instance.props = {
                        ...oldNodeCopy.instance.instance.props,
                    };
                }

                if (!isPrimitive(instanceRender)) {
                    instanceRender.props.context = {
                        ...newNode.props.context,
                        ...instanceRender.props.context,
                    };
                }

                updateElement(
                    instanceRender,
                    oldNodeCopy.instance?.instance,
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
