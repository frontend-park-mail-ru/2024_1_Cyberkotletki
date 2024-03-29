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
        const key = keyProp === 'className' ? 'class' : keyProp;

        if (isDefined(value) && value !== false) {
            node?.setAttribute(key, `${value}`);
        } else {
            node?.removeAttribute(key);
        }
    } else {
        throw new TypeError(
            `Тип "${typeof value}" невозможно назначить в качестве атрибута "${keyProp}"`,
        );
    }
};
