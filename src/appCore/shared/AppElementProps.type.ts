import type { AppNode } from '@/appCore/shared/AppNode.types';

export interface AppElementProps<T extends HTMLElement = HTMLElement> {
    key?: string | number;
    ref?: App.LegacyRef<T>;
    children?: AppNode[];
}
