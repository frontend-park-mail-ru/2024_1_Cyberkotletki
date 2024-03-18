import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppElementProps } from '@/appCore/shared/AppElementProps.type';
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
export const createAppElement = <Props extends AppElementProps>(
    type: AppComponentConstructor,
    config?: Props,
    maybeKey?: string,
) => {
    const { key: propsKey, ref, ...props } = config ?? {};

    const key = maybeKey ?? propsKey;

    const element: AppElement<AppComponentConstructor> = {
        $$typeof: APP_ELEMENT_TYPE,
        type,
        props: props ?? null,
        key: isDefined(key) ? Symbol.for(`${key}`) : Symbol('app.element.key'),
        ref: null,
    };

    if (typeof ref === 'function') {
        ref(null);
    } else if (ref) {
        ref.current = null;
    }

    return element;
};
