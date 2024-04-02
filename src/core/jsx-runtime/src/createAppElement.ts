import type { JSXProps } from './shared/JSXProps.type';

import { spreadToSingleArray, isDefined } from '@/utils';
import type { AppElement } from '@/core/shared/AppElement.type';
import type { AppNode } from '@/core/shared/AppNode.types';
import { APP_ELEMENT_TYPE } from '@/core/shared/AppSymbols';
import { defineElementTypesAndPreventExtensions } from '@/core/jsx-runtime/src/defineElementTypesAndPreventExtensions';
import type { AppComponentConstructor } from '@/core/src/AppComponent.types';

/**
 * Создает объект из JSX для кастомного компонента
 * @param  type Функция, которая создает компонент
 * @param config Пропсы
 * @param maybeKey Ключ
 * @returns Возвращает AppElement объект
 */
export const createAppElement = <Props extends JSXProps>(
    type: AppComponentConstructor,
    config?: Props,
    maybeKey?: string,
) => {
    const {
        key: propsKey,
        ref,
        children: propsChildren,
        ...props
    } = config ?? {};

    const children: AppNode[] = spreadToSingleArray(propsChildren);

    const key = maybeKey ?? propsKey;

    const element: AppElement<AppComponentConstructor> = {
        $$typeof: APP_ELEMENT_TYPE,
        type,
        props: { ...props, children, ref },
        key: isDefined(key) ? Symbol.for(`${key}`) : Symbol.for(type.name),
        ref: null,
        owner: null,
        instance: null,
    };

    defineElementTypesAndPreventExtensions(element, {
        $$typeof: APP_ELEMENT_TYPE,
        type,
    });

    return element;
};
