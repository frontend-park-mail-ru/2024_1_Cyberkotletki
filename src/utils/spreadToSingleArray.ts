/**
 * Разворачивает массив массивов в один массив
 * @param value Массив, который может состоять из
 * бесконечной вложенности массивов
 * @returns Возвращает один массив, состоящий только из элементов не-массивов
 * @example `spreadToSingleArray([1, [[2, 3], 4], 5]) === [1, 2, 3, 4, 5]`
 */
export const spreadToSingleArray = <T>(value: T | Iterable<T>) => {
    let array: T[] = [];

    if (value && typeof value === 'object' && Symbol.iterator in value) {
        if (Array.isArray(value)) {
            value.forEach((child: T) => {
                array = [...array, ...spreadToSingleArray(child)];
            });
        }
    } else {
        array.push(value);
    }

    return array;
};
