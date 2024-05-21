import { isDefined, isPrimitive } from '@/utils';

/**
 * Устанавливает аттрибут к DOM ноде
 * @param {HTMLElement} node Узел, в который устанавливаются атрибуты
 * @param {string} keyProp Название атрибута
 * @param {unknown} value Значение атрибута
 */
export const setAttributeWithCheck = (
    node: HTMLElement | undefined | null,
    keyProp: string,
    value: unknown,
) => {
    if (isPrimitive(value)) {
        const key = (() => {
            switch (keyProp) {
                case 'className':
                    return 'class';
                case 'htmlFor':
                    return 'for';
                default:
                    return keyProp;
            }
        })();

        if (isDefined(value) && value !== false) {
            node?.setAttribute(key, `${value}`);
        } else {
            node?.removeAttribute(key);
        }
    }
};
