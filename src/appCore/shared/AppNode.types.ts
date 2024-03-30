import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppComponentConstructor } from '@/appCore/src/AppComponent.types';

/** Тип, который может использоваться в children JSX разметки */
export type AppNode =
    | string
    | number
    | undefined
    | boolean
    | null
    | AppElement<AppComponentConstructor<object>>
    | AppElement<keyof HTMLElementTagNameMap, HTMLElement>;
