import { addEventListenerWithCheck, setAttributeWithCheck } from './utils';

import { APP_NODE_EVENTS } from '@/core/shared/AppNodeEvent.type';
import { includes } from '@/utils';

/**
 * Устанавливает аттрибуты к DOM ноде, в том числе и обработчики событий
 * @param {HTMLElement} node Узел, в который устанавливаются атрибуты
 * @param {object} config Аттрибуты, которые добавятся к узлу
 */
export const setAttributes = (node: HTMLElement, config?: object | null) => {
    const { key, children, ref, ...props } = (config ?? {}) as Record<
        string,
        unknown
    >;

    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (includes(APP_NODE_EVENTS, key)) {
                addEventListenerWithCheck(node, key, value);

                return;
            }

            setAttributeWithCheck(node, key, value);
        });
    }

    // ? Это нужно, чтобы сделать вид, что переменные используются
    // Они вытащены из конфигов, чтобы они не пошли в аттрибуты элемента
    void key;
    void children;
    void ref;
};
