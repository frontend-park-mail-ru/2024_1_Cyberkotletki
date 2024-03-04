/**
 *
 * @param {any} left
 * @param {any} right
 * @returns {boolean}
 */
export const isEqual = (left, right) => {
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
            if (!isEqual(right[key], value)) {
                return false;
            }
        }

        return true;
    }

    return left === right;
};
