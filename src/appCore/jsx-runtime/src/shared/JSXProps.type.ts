export interface JSXProps<T extends HTMLElement | null = HTMLElement> {
    key?: string | number;
    children?: JSX.Children;
    ref?: App.Ref<T>;
}
