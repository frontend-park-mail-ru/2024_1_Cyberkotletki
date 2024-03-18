import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppElementProps } from '@/appCore/shared/AppElementProps.type';
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
    Props extends AppElementProps<HTMLElementTagNameMap[T]>,
>(
    type: T,
    config?: Props,
    maybeKey?: string,
) => {
    const { key: propsKey, ref, ...props } = config ?? {};

    const key = maybeKey ?? propsKey;

    const element: AppElement<T, HTMLElementTagNameMap[T]> = {
        $$typeof: DOM_ELEMENT_TYPE,
        type,
        props: props ?? null,
        key: isDefined(key) ? Symbol.for(`${key}`) : Symbol('node.element.key'),
        ref: null,
    };

    if (typeof ref === 'function') {
        ref(null);
    } else if (ref) {
        ref.current = null;
    }

    return element;
};
