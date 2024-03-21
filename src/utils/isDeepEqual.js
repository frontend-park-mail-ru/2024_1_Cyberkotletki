/**
 *
 * @param {any} left Первое значение
 * @param {any} right Второе значение
 * @returns {boolean} `true`- если равны, `false` - если нет
 */
export const isDeepEqual = (left, right) => {
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
            if (!isDeepEqual(right[key], value)) {
                return false;
            }
        }

        return true;
    }

    return left === right;
};
