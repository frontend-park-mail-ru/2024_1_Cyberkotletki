import type { JSXProps } from './shared/JSXProps.type';
import { defineElementTypesAndPreventExtensions } from './defineElementTypesAndPreventExtensions';

import { spreadToSingleArray, isDefined } from '@/utils';
import type { AppElement } from '@/core/shared/AppElement.type';
import type { AppNode } from '@/core/shared/AppNode.types';
import { DOM_ELEMENT_TYPE } from '@/core/shared/AppSymbols';

/**
 * Создает объект из JSX для DOM элемента
 * @param  type название тега `div`, `span` и др.
 * @param config Пропсы
 * @param maybeKey Ключ
 * @returns Возвращает AppElement объект
 */
export const createDOMElement = <
    T extends keyof HTMLElementTagNameMap,
    Props extends JSXProps<HTMLElementTagNameMap[T]>,
>(
    type: T,
    config?: Props,
    maybeKey?: string,
) => {
    const {
        key: propsKey,
        ref,
        children: propsChildren,
        ...props
    } = config ?? {};

    const key = maybeKey ?? propsKey;

    const children: AppNode[] = spreadToSingleArray(propsChildren);

    const element: AppElement<T, HTMLElementTagNameMap[T]> = {
        $$typeof: DOM_ELEMENT_TYPE,
        type,
        props: { ...props, children, ref },
        key: isDefined(key) ? Symbol.for(`${key}`) : Symbol.for(type),
        ref: null,
        owner: null,
        instance: null,
    };

    defineElementTypesAndPreventExtensions(element, {
        $$typeof: DOM_ELEMENT_TYPE,
        type,
    });

    return element;
};
