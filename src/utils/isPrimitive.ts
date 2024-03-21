/**
 * Проверяет на "примитивность"
 * @param  value Первое значение
 * @returns {boolean} `true`- можно делать строгое сравнение, `false` - нельзя
 */
export const isPrimitive = (
    value: unknown,
): value is string | number | boolean | null | undefined => {
    switch (typeof value) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'undefined':
            return true;
        default:
            return value === null;
    }
};
