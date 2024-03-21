import type { JSXProps } from '@/appCore/jsx-runtime/JSXProps.type';
import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppNode } from '@/appCore/shared/AppNode.types';
import { APP_ELEMENT_TYPE } from '@/appCore/shared/AppSymbols';
import type { AppComponentConstructor } from '@/appCore/src/AppComponent.types';
import { isDefined } from '@/utils';

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

    const key = maybeKey ?? propsKey;

    const element: AppElement<AppComponentConstructor> = {
        $$typeof: APP_ELEMENT_TYPE,
        type,
        props: { ...props, children },
        key: isDefined(key) ? Symbol.for(`${key}`) : Symbol('app.element.key'),
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
