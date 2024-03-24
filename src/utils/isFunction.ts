/**
 * Проверка, является ли значение типизированной функцией
 * @param value Значение
 * @returns Да/Нет
 */
export const isFunction = <Args, Returns, Value>(
    value: Value | ((args: Args) => Returns),
): value is (args: Args) => Returns => typeof value === 'function';
