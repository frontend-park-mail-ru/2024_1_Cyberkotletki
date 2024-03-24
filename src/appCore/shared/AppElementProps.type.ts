import type { AppNode } from '@/appCore/shared/AppNode.types';

/**
 * Пропсы, которые всегда можно использовать в компонентах,
 * независимо от того, какие пропсы у компонента
 */
export interface AppElementProps<T extends HTMLElement = HTMLElement> {
    key?: string | number;
    ref?: App.Ref<T>;
    children?: AppNode[];
}
