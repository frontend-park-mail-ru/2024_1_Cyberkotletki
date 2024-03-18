export type AppElementRef<T extends HTMLElement | null = null> =
    | ((node: T | null) => void)
    | { current: T | null };
