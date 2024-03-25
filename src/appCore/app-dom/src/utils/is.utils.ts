import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppNode } from '@/appCore/shared/AppNode.types';
import {
    APP_ELEMENT_TYPE,
    DOM_ELEMENT_TYPE,
} from '@/appCore/shared/AppSymbols';
import type { AppComponentConstructor } from '@/appCore/src/AppComponent.types';
import { isPrimitive } from '@/utils';

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

/**
 * Проверка на определенность элемента для DOM
 * @param value Значение
 * @returns `true` - можно маунтить, `false` - нельзя
 */
export const isElementDefined = <T>(
    value: T | undefined | null | boolean,
): value is T =>
    typeof value !== 'undefined' &&
    typeof value !== 'boolean' &&
    value !== null;

export const isChangedElements = (nodeLeft: AppNode, nodeRight: AppNode) => {
    if (isPrimitive(nodeLeft)) {
        if (!isElementDefined(nodeLeft) && !isElementDefined(nodeRight)) {
            return false;
        }

        return nodeLeft !== nodeRight;
    }

    if (isPrimitive(nodeRight)) {
        return true;
    }

    return nodeLeft.key !== nodeRight.key;
};

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

/**
 * Проверка, является ли узел текстовым
 * @param node Узел
 * @returns Да/Нет
 */
export const isTextNode = (node: AppNode): node is string | number =>
    typeof node === 'string' || typeof node === 'number';
