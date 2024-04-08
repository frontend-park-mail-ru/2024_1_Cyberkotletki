import {
    addEventListenerWithCheck,
    removeEventListenerWithCheck,
    setAttributeWithCheck,
} from './utils';

import { APP_NODE_EVENTS } from '@/core/shared/AppNodeEvent.type';
import { includes, isDefined } from '@/utils';

/**
 * Обновляет аттрибуты у DOM ноде, в том числе и обработчики событий
 * @param {object} prevConfig Предыдущие пропсы
 * @param {object} nextConfig Следующие пропсы
 * @param {HTMLElement} node Узел, у которого изменяются атрибуты
 */
export const updateAttributes = (
    prevConfig?: object | null,
    nextConfig?: object | null,
    node?: HTMLElement | null,
) => {
    const {
        key: pKey,
        ref: pRef,
        children: pChildren,
        ...prevProps
    } = (prevConfig ?? {}) as Record<string, unknown>;
    const { key, ref, children, ...nextProps } = (nextConfig ?? {}) as Record<
        string,
        unknown
    >;

    // Удаление аттрибутов которых больше нету в новых пропсах
    Object.entries(prevProps).forEach(([key, value]) => {
        if (includes(APP_NODE_EVENTS, key)) {
            if (value !== nextProps[key]) {
                removeEventListenerWithCheck(node, key, value);
            }

            return;
        }

        if (!isDefined(nextProps[key])) {
            node?.removeAttribute(key);
        }
    });

    // Изменение атрибутов
    Object.entries(nextProps).forEach(([key, value]) => {
        if (includes(APP_NODE_EVENTS, key)) {
            if (value !== prevProps?.[key]) {
                addEventListenerWithCheck(node, key, value);
            }

            return;
        }

        setAttributeWithCheck(node, key, value);
    });

    // ? Это нужно, чтобы сделать вид, что переменные используются
    // Они вытащены из конфигов, чтобы они не пошли в аттрибуты элемента
    void pKey;
    void pRef;
    void pChildren;
    void key;
    void ref;
    void children;
};
