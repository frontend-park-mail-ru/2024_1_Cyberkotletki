import type { AppElementRef } from '@/appCore/shared/AppElementRef.type';

export interface JSXProps<T extends HTMLElement | null = HTMLElement> {
    key?: string | number;
    children?: JSX.Children;
    ref?: AppElementRef<T>;
}
