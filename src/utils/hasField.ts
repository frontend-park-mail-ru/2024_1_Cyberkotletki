/* eslint-disable valid-typeof */
export interface JSTypeObj {
    bigint: bigint;
    boolean: boolean;
    function: () => void;
    number: number;
    string: string;
    object: object | null;
    undefined: undefined;
    symbol: symbol;
}

/**
 * Проверяет наличие поля в значении
 * @param value Значение
 * @param field поле
 * @param type тип поля (опционально)
 * @returns boolean
 * @example
 * ```
 * const obj = {
 *  value: "2",
 * }
 *
 * hasField(obj, "value") === true
 * hasField(obj, "value", "string") === true
 * hasField(obj, "value", "number") === false
 * hasField(obj, "name") === false
 * ```
 */
export const hasField = <T extends string, Type extends keyof JSTypeObj>(
    value: unknown,
    field: T,
    type?: Type,
): value is Record<T, JSTypeObj[Type]> => {
    const check = !!value && typeof value === 'object' && field in value;

    return type
        ? check && typeof (value as Record<T, Type>)[field] === type
        : check;
};
