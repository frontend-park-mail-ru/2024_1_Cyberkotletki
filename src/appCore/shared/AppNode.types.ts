import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppComponentConstructor } from '@/appCore/src/AppComponent.types';

export type AppNode =
    | string
    | number
    | null
    | undefined
    | boolean
    | AppElement<AppComponentConstructor>
    | AppElement<keyof HTMLElementTagNameMap>;
