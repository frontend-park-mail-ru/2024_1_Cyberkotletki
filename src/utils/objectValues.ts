/**
 * То же самое что и `Object.prototype.values`, но с нормальной типизацией
 * @param value `Record<T, V>` Объект
 * @returns `V[]` Типизированный массив
 */
export const objectValues = <T extends string | number | symbol, V>(
    value: Record<T, V>,
): V[] => Object.values(value);
