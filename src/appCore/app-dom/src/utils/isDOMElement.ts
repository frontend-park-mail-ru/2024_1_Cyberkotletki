import type { AppElement } from '@/appCore/shared/AppElement.type';
import { DOM_ELEMENT_TYPE } from '@/appCore/shared/AppSymbols';

/**
 * Проверка $$typeof у элемента.
 * После проверки TypeScript понимает, что element.type === string
 * @param element Элемент с $$typeof свойством
 * @returns element.$$typeof === DOM_ELEMENT_TYPE
 */
export const isDOMElement = (
    element: JSX.Element,
): element is AppElement<keyof HTMLElementTagNameMap, HTMLElement> =>
    element.$$typeof === DOM_ELEMENT_TYPE;
