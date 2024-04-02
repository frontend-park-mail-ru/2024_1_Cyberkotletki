import type { AppElement } from '@/core/shared/AppElement.type';
import type { AppComponentConstructor } from '@/core/src/AppComponent.types';

/** Тип, который может использоваться в children JSX разметки */
export type AppNode =
    | AppElement<AppComponentConstructor<object>>
    | AppElement<keyof HTMLElementTagNameMap, HTMLElement>
    | string
    | number
    | boolean
    | undefined
    | null;
