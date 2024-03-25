/**
 * То же самое что и `Array.prototype.includes`, но с нормальной типизацией.
 * Т.е. если массив `arr` типа `T[]` и `arr.includes(value) === true`,
 * то значит `value` типа `T`
 * @param arr Массив
 * @param value Значение
 * @returns {boolean} Включает или не включает
 */
export const includes = <T>(arr: T[], value: unknown): value is T =>
    arr.includes(value as T);
