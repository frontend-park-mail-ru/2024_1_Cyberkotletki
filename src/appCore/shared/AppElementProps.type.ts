import type { AppElementRef } from '@/appCore/shared/AppElementRef.type';
import type { AppNode } from '@/appCore/shared/AppNode.types';

document.createElement('');

export interface AppElementProps<T extends HTMLElement | null = null> {
    key?: string | number;
    ref?: AppElementRef<T>;
    children?: (AppNode | AppNode[])[] | AppNode;
}
