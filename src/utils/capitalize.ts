/**
 * Преобразование строки в строку с заглавной буквой
 * @param str Строка
 * @returns Возвращает строку с заглавной буквой
 */
export const capitalize = (str?: string) =>
    `${str?.[0].toLocaleUpperCase() ?? ''}${str?.slice(1) ?? ''}`;
