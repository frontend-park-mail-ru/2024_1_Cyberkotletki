import {
    APP_NODE_EVENTS,
    APP_NODE_EVENT_MAP,
} from '@/appCore/shared/AppNodeEvent.type';
import { includes, isDefined, isPrimitive } from '@/utils';

/**
 * Обновляет аттрибуты у DOM ноде, в том числе и обработчики событий
 * @param {object} prevConfig Предыдущие пропсы
 * @param {object} nextConfig Следующие пропсы
 * @param {HTMLElement} node Узел, у которого изменяются атрибуты
 */
export const updateAttributes = (
    prevConfig?: object,
    nextConfig?: object,
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

    Object.entries(prevProps).forEach(([key, value]) => {
        if (includes(APP_NODE_EVENTS, key)) {
            if (value !== nextProps[key]) {
                if (typeof value === 'function') {
                    node?.removeEventListener(
                        APP_NODE_EVENT_MAP[key],
                        value as () => void,
                    );
                } else {
                    throw new TypeError(
                        `Невозможно удалить тип "${typeof value}" обработчика события "${key}"`,
                    );
                }
            }

            return;
        }

        if (!nextProps[key]) {
            node?.removeAttribute(key);
        }
    });

    Object.entries(nextProps).forEach(([key, value]) => {
        if (includes(APP_NODE_EVENTS, key)) {
            if (value !== prevProps?.[key]) {
                if (typeof value === 'function') {
                    node?.addEventListener(
                        APP_NODE_EVENT_MAP[key],
                        value as () => void,
                    );
                } else {
                    throw new TypeError(
                        `Тип "${typeof value}" невозможно назначить в качестве обработчика события "${key}"`,
                    );
                }
            }

            return;
        }

        if (isPrimitive(value)) {
            if (value !== prevProps[key]) {
                if (isDefined(value) && value !== false) {
                    node?.setAttribute(key, `${value}`);
                } else {
                    node?.removeAttribute(key);
                }
            }
        } else {
            throw new TypeError(
                `Тип "${typeof value}" невозможно назначить в качестве атрибута "${key}"`,
            );
        }
    });

    void pKey;
    void pRef;
    void pChildren;
    void key;
    void ref;
    void children;
};
