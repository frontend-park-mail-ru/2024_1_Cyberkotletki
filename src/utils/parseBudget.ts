/**
 * Парсинг строки с бюджетом
 * @param budget строка с бюджетом
 * @returns Бюджет в более понятном виде
 * @example
 * ```ts
 * parseBudget("185000000 $") === "$185 000 000"
 * parseBudget("185000000 ₽") === "185 000 000 ₽"
 * ```
 */
export const parseBudget = (budget?: string) => {
    const onlyDigit = Number(budget?.replace(/\D/g, ''));

    switch (true) {
        case budget?.includes('$'):
            return `$${onlyDigit.toLocaleString()}`;
        case budget?.includes('₽'):
            return `${onlyDigit.toLocaleString()} ₽`;
        default:
            return `${onlyDigit.toLocaleString()}${budget?.replace(/\d/g, '') ?? ''}`;
    }
};
