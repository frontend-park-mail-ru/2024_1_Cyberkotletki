import type { AppElementProps } from '@/appCore/shared/AppElementProps.type';
import type { AppComponentConstructor } from '@/appCore/src/AppComponent.types';

export interface AppElement<
    K extends keyof HTMLElementTagNameMap | AppComponentConstructor,
    Element extends HTMLElement | null = null,
> {
    $$typeof: symbol;
    type: K | null;
    key: symbol;
    ref: Element | null;
    props: AppElementProps<Element> | null;
}
