/**
 * То же самое что и `Object.prototype.keys`, но с нормальной типизацией
 * @param value `Record<T, V>` Объект
 * @returns `T[]` Типизированный массив
 */
export const objectKeys = <T extends string | number | symbol>(
    value: Record<T, unknown>,
) => Object.keys(value) as T[];
