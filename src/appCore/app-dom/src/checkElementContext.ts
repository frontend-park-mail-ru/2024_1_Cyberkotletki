import { isAppElement, isDOMElement, isElementDefined } from './utils';
import { updateElement } from './updateElement';

import type { AppNode } from '@/appCore/shared/AppNode.types';
import { isPrimitive } from '@/utils';

/**
 * Проходит по всему дереву, чтобы определить компоненты,
 * подписанные на контекст
 * @param newNode Новая нода
 * @param oldNode Старая нода
 * @param owner (НЕОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ) родительский DOM элемент,
 * ОБЯЗАТЕЛЬНЫЙ АРГУМЕНТ для изменения ТЕКСТОВОГО УЗЛА
 * @param index позиция oldNode в $parent.
 * @returns Возвращает узел, если компонент был изменен контекстом, иначе `null`
 */
export const checkElementContext = (
    newNode?: AppNode,
    oldNode?: AppNode,
    owner?: JSX.Element | null,
    index?: number,
): AppNode => {
    if (!isPrimitive(newNode) && !isPrimitive(oldNode)) {
        newNode.owner = owner ?? null;

        if (isDOMElement(newNode)) {
            if (oldNode.ref instanceof HTMLElement) {
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

                    checkElementContext(newChild, oldChildren?.[i], oldNode, i);
                }
            }

            return null;
        }

        if (isAppElement(newNode)) {
            const GenerateInstance = newNode.type;

            const instance = new GenerateInstance(newNode.props ?? {});

            instance.state = oldNode.instance?.state ?? {};

            const instanceRender = instance.render();

            instance.owner = oldNode.owner;
            instance.instance = instanceRender;

            if (
                oldNode.instance?.componentShouldUpdate(
                    instance.props,
                    oldNode.instance.state,
                )
            ) {
                newNode.instance = instance;

                updateElement(
                    instanceRender,
                    oldNode.instance?.instance,
                    oldNode,
                    index,
                );

                newNode.ref = isPrimitive(instanceRender)
                    ? null
                    : instanceRender.ref;
                instance.ref = newNode.ref;

                instance.componentDidUpdate(
                    instance.state,
                    oldNode.instance?.props ?? null,
                );

                return newNode;
            }

            newNode.instance = oldNode.instance;
            newNode.ref = oldNode.ref;

            const node = checkElementContext(
                instanceRender,
                oldNode.instance?.instance,
                oldNode,
                index,
            );

            if (node) {
                instance.ref = isPrimitive(instanceRender)
                    ? null
                    : instanceRender.ref;
                newNode.instance = instance;
                newNode.ref = instance.ref;
            }

            return node;
        }
    }

    return null;
};
