export const MONTH_NAMES = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
] as const;

/**
 *
 * @param dateStr Строка даты
 * @returns Дата в человекочитаемом виде
 * @example
 * ```
 * getHumanDate("1975-01-01T00:00:00Z") === "01 января 1975"
 * ```
 */
export const getHumanDate = (dateStr?: string) => {
    const date = new Date(dateStr ?? new Date().toISOString());

    const day = `0${date.getDate()}`.slice(-2);
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${MONTH_NAMES[month]} ${year}`;
};
