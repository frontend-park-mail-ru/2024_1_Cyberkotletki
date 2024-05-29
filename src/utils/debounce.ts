/**
 * Creates a debounced function that delays invoking `func` until after`wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked.
 * @param callback The function to debounce.
 * @param delay The number of milliseconds to delay.
 * @returns Returns the new debounced function.
 */
export const debounce = <Args extends [], T extends (...args: Args) => void>(
    callback: T,
    delay: number,
) => {
    let timeoutId: ReturnType<typeof setTimeout> | number = Number.NaN;

    return ((...args: Args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback(...args);
        }, delay);
    }) as T;
};
