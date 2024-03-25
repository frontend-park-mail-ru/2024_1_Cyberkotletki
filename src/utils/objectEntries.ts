/**
 * То же самое что и `Object.prototype.entries`, но с нормальной типизацией
 * @param value `Record<K, V>` Объект
 * @returns `[K, V][]` Типизированный массив
 */
export const objectEntries = <K extends string | number | symbol, V>(
    value: Record<K, V>,
) => Object.entries(value) as [K, V][];
