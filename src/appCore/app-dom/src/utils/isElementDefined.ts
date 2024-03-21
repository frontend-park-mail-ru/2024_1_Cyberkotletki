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
