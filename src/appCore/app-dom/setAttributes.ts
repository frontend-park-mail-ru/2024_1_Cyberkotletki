import {
    APP_NODE_EVENTS,
    APP_NODE_EVENT_MAP,
} from '@/appCore/shared/AppNodeEvent.type';
import { includes, isDefined, isPrimitive } from '@/utils';

/**
 * Устанавливает аттрибуты к DOM ноде, в том числе и обработчики событий
 * @param {HTMLElement} node Узел, в который устанавливаются атрибуты
 * @param {object} config Аттрибуты, которые добавятся к узлу
 */
export const setAttributes = (node: HTMLElement, config?: object) => {
    const { key, children, ref, ...props } = (config ?? {}) as Record<
        string,
        unknown
    >;

    void key;
    void children;
    void ref;

    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (includes(APP_NODE_EVENTS, key)) {
                if (typeof value === 'function') {
                    node.addEventListener(
                        APP_NODE_EVENT_MAP[key],
                        value as () => void,
                    );
                } else {
                    throw new TypeError(
                        `Тип "${typeof value}" невозможно назначить в качестве обработчика события "${key}"`,
                    );
                }

                return;
            }

            if (isPrimitive(value)) {
                if (isDefined(value) && value !== false) {
                    node.setAttribute(key, `${value}`);
                } else {
                    node.removeAttribute(key);
                }
            } else {
                throw new TypeError(
                    `Тип "${typeof value}" невозможно назначить в качестве атрибута "${key}"`,
                );
            }
        });
    }
};
