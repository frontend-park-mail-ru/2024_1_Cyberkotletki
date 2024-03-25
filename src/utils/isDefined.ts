/**
 * Проверка значения на определенность
 * (на равенство `null` и `undefined`)
 * @param  value Значение
 * @returns {boolean} `true`- значение определено,
 * `false` - значение не определено
 */
export const isDefined = <T>(value: T | null | undefined): value is T =>
    value !== null && value !== undefined;
