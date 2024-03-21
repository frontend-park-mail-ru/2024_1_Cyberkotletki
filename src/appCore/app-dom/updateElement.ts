import { createElement } from '@/appCore/app-dom/createElement';
import { isChangedElements } from '@/appCore/app-dom/isChangedElements';
import { removeElement } from '@/appCore/app-dom/removeElement';
import { replaceElements } from '@/appCore/app-dom/replaceElements';
import { updateAttributes } from '@/appCore/app-dom/updateAttributes';
import type { AppNode } from '@/appCore/shared/AppNode.types';
import {
    APP_ELEMENT_TYPE,
    DOM_ELEMENT_TYPE,
} from '@/appCore/shared/AppSymbols';
import { isDefined, isPrimitive } from '@/utils';
import { isEqual } from '@/utils/isEqual';

export const updateElement = (
    $parent: HTMLElement,
    newNode?: AppNode,
    oldNode?: AppNode,
    index?: number,
) => {
    if (!isDefined(oldNode) || oldNode === false) {
        const $element = createElement(newNode, $parent);

        if ($element) {
            $parent.appendChild($element);
        }
    } else if (!isDefined(newNode) || newNode === false) {
        removeElement($parent, oldNode);
    } else if (isChangedElements(newNode, oldNode)) {
        replaceElements($parent, newNode, oldNode, index);
    } else if (
        !isPrimitive(newNode) &&
        !isPrimitive(oldNode) &&
        newNode.type === oldNode.type
    ) {
        if (newNode.$$typeof === DOM_ELEMENT_TYPE) {
            newNode.owner = oldNode.owner;
            newNode.ref = oldNode.ref;

            const maxChildLength = Math.max(
                newNode.props?.children?.length ?? 0,
                oldNode.props?.children?.length ?? 0,
            );

            if (oldNode.ref instanceof HTMLElement) {
                updateAttributes(oldNode.props, newNode.props, oldNode.ref);

                let newIndex = 0;
                let oldIndex = 0;

                while (newIndex < maxChildLength || oldIndex < maxChildLength) {
                    if (
                        (!isDefined(oldNode.props?.children?.[oldIndex]) ||
                            oldNode.props?.children?.[oldIndex] === false) &&
                        oldIndex < maxChildLength - 1 &&
                        isDefined(newNode.props?.children?.[newIndex])
                    ) {
                        oldIndex++;

                        continue;
                    }

                    updateElement(
                        oldNode.ref,
                        newNode.props?.children?.[newIndex],
                        oldNode.props?.children?.[oldIndex],
                        oldIndex,
                    );

                    newIndex++;
                    oldIndex++;
                }
            }

            return;
        }

        if (
            newNode.$$typeof === APP_ELEMENT_TYPE &&
            typeof newNode.type === 'function'
        ) {
            const GenerateInstance = newNode.type;

            const instance = new GenerateInstance(newNode.props);
            newNode.instance = instance;
            // instance.state = oldNode.instance?.state ?? null;

            const instanceRender = instance.render();

            instance.owner = $parent;
            instance.instance = instanceRender;

            updateElement($parent, instanceRender, oldNode.instance?.instance);

            if (!isEqual(oldNode.instance?.props, newNode.instance.props)) {
                instance.componentDidUpdate(
                    instance.state,
                    oldNode.instance?.props ?? null,
                );
            }
        }
    }
};
