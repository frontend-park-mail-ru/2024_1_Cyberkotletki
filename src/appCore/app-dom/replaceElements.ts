import { createElement } from './createElement';

import { DOM_ELEMENT_TYPE } from '@/appCore/shared/AppSymbols';
import type { AppNode } from '@/appCore/shared/AppNode.types';
import { removeElement } from '@/appCore/app-dom/removeElement';
import { isDefined } from '@/utils';

export const replaceElements = (
    $parent: HTMLElement,
    newNode?: AppNode,
    oldNode?: AppNode,
    index?: number,
) => {
    if (typeof oldNode === 'string' || typeof oldNode === 'number') {
        const textChild = isDefined(index)
            ? $parent.childNodes[index]
            : [...($parent.childNodes ?? [])].find(
                  (child) => (child as Text)?.data === `${oldNode}`,
              );

        const $element = createElement(newNode, $parent);

        if ($element) {
            textChild?.replaceWith($element);
        }

        return;
    }

    if (typeof oldNode === 'boolean' || !oldNode) {
        return;
    }

    if (oldNode.$$typeof === DOM_ELEMENT_TYPE) {
        const children = oldNode.props?.children;

        const { ref } = oldNode;

        if (ref instanceof HTMLElement) {
            children?.forEach((child) => {
                removeElement(ref, child);
            });
        }

        const $element = createElement(newNode, $parent);

        if ($element) {
            ref?.replaceWith($element);
        }

        return;
    }

    if (oldNode.instance) {
        oldNode.instance.componentWillUnmount();

        const $element = createElement(newNode, $parent);

        if ($element) {
            oldNode.instance.ref?.replaceWith($element);
        }

        removeElement($parent, oldNode.instance.instance);
        oldNode.instance.unmount();
    }
};
