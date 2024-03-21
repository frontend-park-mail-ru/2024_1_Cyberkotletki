import type { AppElement } from '@/appCore/shared/AppElement.type';
import { APP_ELEMENT_TYPE } from '@/appCore/shared/AppSymbols';
import type { AppComponentConstructor } from '@/appCore/src/AppComponent.types';

/**
 * Проверка $$typeof у элемента.
 * После проверки TypeScript понимает, что element.type === constructor
 * @param element Элемент с $$typeof свойством
 * @returns element.$$typeof === APP_ELEMENT_TYPE
 */
export const isAppElement = (
    element: JSX.Element,
): element is AppElement<AppComponentConstructor> =>
    element.$$typeof === APP_ELEMENT_TYPE;
