/**
 * Проверка рна "примитивность"
 * @param {any} value
 * @returns `true`/`false`
 */

export const isPrimitiveType = (value) =>
    typeof value === 'string' || typeof value === 'number';
