/**
 * Создает query параметры из объекта
 *  @param params Объект
 * @returns Возвращает query params строку
 */
export const createQueryParams = (
    params: Record<string, string | number | boolean | undefined>,
) => {
    let result = '';
    let index = 0;

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            result += index === 0 ? '?' : '&';
            result += `${key}=${encodeURIComponent(String(value))}`;
            ++index;
        }
    });

    return result;
};
