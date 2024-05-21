/**
 * Разворачивает массив массивов в один массив
 * @param value Массив, который может состоять из
 * бесконечной вложенности массивов
 * @returns Возвращает один массив, состоящий только из элементов не-массивов
 * @example `spreadToSingleArray([1, [[2, 3], 4], 5]) === [1, 2, 3, 4, 5]`
 */
export const spreadToSingleArray = <T>(value: T | Iterable<T>) => {
    if (value && typeof value === 'object' && Symbol.iterator in value) {
        if (Array.isArray(value)) {
            return value.flat(Infinity) as T[];
        }
    } else {
        return [value];
    }

    return [];
};
