import type { AppElementRef } from '@/appCore/shared/AppElementRef.type';
import type { AppNode } from '@/appCore/shared/AppNode.types';

export interface AppElementProps<T extends HTMLElement = HTMLElement> {
    key?: string | number;
    ref?: AppElementRef<T>;
    children?: AppNode[];
}
