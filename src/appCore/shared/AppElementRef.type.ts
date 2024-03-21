export type AppElementRef<T extends HTMLElement | null = HTMLElement> =
    | ((node: T | null) => void)
    | { current: T | null };
