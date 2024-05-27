/**
 *
 * @param dateStr Строка даты
 * @param withTime Флаг для отображения показа времени
 * @returns Дата в человекочитаемом виде
 * @example
 * ```
 * getHumanDate("1975-01-01T00:00:00Z") === "01.01.1975 в 00:00"
 * getHumanDate("1975-01-01T00:00:00Z", false) === "01.01.1975"
 * ```
 */
export const getDateString = (dateStr?: string, withTime = true) => {
    if (!dateStr) {
        return '';
    }

    const date = new Date(dateStr);

    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const year = date.getFullYear();

    return `${day}.${month}.${year}${withTime ? ` в ${hours}:${minutes}` : ''}`;
};
