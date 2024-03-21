import { updateElement } from './updateElement';

import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppNode } from '@/appCore/shared/AppNode.types';
import { ROOT_ELEMENT_TYPE } from '@/appCore/shared/AppSymbols';

/**
 * Создает виртуальный DOM и прикрепляет все DOM элементы к $root
 * @param $root Корневой элемент
 * @param child Дочерний элемент
 */
export const createRoot = ($root?: HTMLElement | null, child?: AppNode) => {
    if (!$root) {
        throw new Error(
            `Тип "${typeof $root}" невозможно создать как корневой элемент`,
        );
    }

    const rootElement: AppElement<keyof HTMLElementTagNameMap, typeof $root> = {
        $$typeof: ROOT_ELEMENT_TYPE,
        type: $root.tagName.toLowerCase() as keyof HTMLElementTagNameMap,
        props: null,
        key: Symbol.for('node.element.key'),
        ref: $root,
        owner: null,
        instance: null,
    };
    Object.freeze(rootElement);

    if (document.readyState !== 'loading') {
        updateElement(child, undefined, rootElement);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            updateElement(child, undefined, rootElement);
        });
    }
};
