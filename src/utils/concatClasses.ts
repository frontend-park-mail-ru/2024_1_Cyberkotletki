/**
 *
 * @param {...string|object} values Значения
 * @returns Строка классов
 */
export function concatClasses(
    this: Record<string, string | undefined>,
    ...values: (string | undefined | Record<string, unknown>)[]
) {
    const array: string[] = [];

    if (values.length) {
        values.forEach((value) => {
            if (typeof value === 'string') {
                array.push(this[value] ?? value);
            }

            if (typeof value === 'object') {
                Object.entries(value).forEach(([key, value]) => {
                    if (value) {
                        if (typeof value === 'string') {
                            array.push(this[value] ?? value);
                        } else {
                            array.push(this[key] ?? key);
                        }
                    }
                });
            }
        });
    }

    return array.join(' ');
}
