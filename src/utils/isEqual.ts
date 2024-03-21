/**
 * Проверка на равенство по первому уровню ключей объектов (неглубокая проверка)
 * и любых других типов
 * @param  left Первое значение
 * @param right Второе значение
 * @returns {boolean} `true`- если равны, `false` - если нет
 */
export const isEqual = (left: unknown, right: unknown): boolean => {
    if (
        left &&
        typeof left === 'object' &&
        right &&
        typeof right === 'object'
    ) {
        if (Object.keys(left).length !== Object.keys(right).length) {
            return false;
        }

        for (const [key, value] of Object.entries(left)) {
            if ((right as Record<string, unknown>)[key] !== value) {
                return false;
            }
        }

        return true;
    }

    return left === right;
};
