/**
 * Удаляет элемент
 * @param element
 */

import type { AppNode } from '@/appCore/shared/AppNode.types';
import { DOM_ELEMENT_TYPE } from '@/appCore/shared/AppSymbols';

export const removeElement = ($parent: HTMLElement, element?: AppNode) => {
    if (typeof element === 'string' || typeof element === 'number') {
        const textChild = [...($parent.childNodes ?? [])].find(
            (child) => (child as Text)?.data === `${element}`,
        );

        textChild?.remove();

        return;
    }

    if (typeof element === 'boolean' || !element) {
        return;
    }

    if (element.$$typeof === DOM_ELEMENT_TYPE) {
        const children = element.props?.children;

        const { ref } = element;

        if (ref instanceof HTMLElement) {
            children?.forEach((child) => {
                removeElement(ref, child);
            });
        }

        ref?.remove();

        return;
    }

    if (element.instance) {
        element.instance.componentWillUnmount();
        removeElement($parent, element.instance.instance);
        element.instance.unmount();
    }
};
