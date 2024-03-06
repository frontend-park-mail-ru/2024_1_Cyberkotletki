/**
 *
 * @param {...string|object} values Значения
 * @returns {string} Строка классов
 */
export function concatClasses(...values) {
    const array = [];

    if (values.length) {
        values.forEach((value) => {
            if (typeof value === 'string') {
                array.push(this[value]);
            }

            if (typeof value === 'object') {
                Object.entries(value).forEach(([key, value]) => {
                    if (value) {
                        array.push(this[key]);
                    }
                });
            }
        });
    }

    return array.join(' ');
}
