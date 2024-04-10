/**
 *
 * @param dateStr Строка даты
 * @returns Дата в человекочитаемом виде
 * @example
 * ```
 * getHumanDate("1975-01-01T00:00:00Z") === "01.01.1975 в 00:00"
 * ```
 */
export const getDateString = (dateStr?: string) => {
    const date = new Date(dateStr ?? new Date().toISOString());

    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const year = date.getFullYear();

    return `${day}.${month}.${year} в ${hours}:${minutes}`;
};
