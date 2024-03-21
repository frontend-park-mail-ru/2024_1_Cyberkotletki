import type { JSXProps } from './shared/JSXProps.type';

import { spreadToSingleArray, isDefined } from '@/utils';
import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppNode } from '@/appCore/shared/AppNode.types';
import { APP_ELEMENT_TYPE } from '@/appCore/shared/AppSymbols';
import type { AppComponentConstructor } from '@/appCore/src/AppComponent.types';
import { defineElementTypesAndPreventExtensions } from '@/appCore/jsx-runtime/src/defineElementTypesAndPreventExtensions';

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
        key: isDefined(key) ? Symbol.for(`${key}`) : Symbol('app.element.key'),
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
