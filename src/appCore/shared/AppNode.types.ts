import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppComponentConstructor } from '@/appCore/src/AppComponent.types';

export type AppNode =
    | string
    | number
    | undefined
    | boolean
    | null
    | AppElement<AppComponentConstructor>
    | AppElement<keyof HTMLElementTagNameMap, HTMLElement>;

export type AppNodeElement = HTMLElement | JSX.Element;
