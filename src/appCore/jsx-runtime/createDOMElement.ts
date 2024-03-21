import type { JSXProps } from '@/appCore/jsx-runtime/JSXProps.type';
import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppNode } from '@/appCore/shared/AppNode.types';
import { DOM_ELEMENT_TYPE } from '@/appCore/shared/AppSymbols';
import { isDefined } from '@/utils';

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

    const children: AppNode[] = [];

    if (Array.isArray(propsChildren)) {
        propsChildren.forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((childsChild) => {
                    children.push(childsChild);
                });
            } else {
                children.push(child);
            }
        });
    } else {
        children.push(propsChildren);
    }

    const element: AppElement<T, HTMLElementTagNameMap[T]> = {
        $$typeof: DOM_ELEMENT_TYPE,
        type,
        props: { ...props, children },
        key: isDefined(key) ? Symbol.for(`${key}`) : Symbol('node.element.key'),
        ref: null,
        owner: null,
        instance: null,
    };

    if (typeof ref === 'function') {
        ref(null);
    } else if (ref) {
        ref.current = null;
    }

    return element;
};
