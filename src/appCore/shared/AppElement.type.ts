import type { AppElementProps } from '@/appCore/shared/AppElementProps.type';
import type {
    AppComponentConstructor,
    AppComponentType,
} from '@/appCore/src/AppComponent.types';

export interface AppElement<
    K extends keyof HTMLElementTagNameMap | AppComponentConstructor,
    Element extends HTMLElement = HTMLElement,
> {
    $$typeof: symbol;
    owner:
        | HTMLElement
        | AppElement<keyof HTMLElementTagNameMap, HTMLElement>
        | AppElement<AppComponentConstructor>
        | null;
    type: K | null;
    key: symbol;

    /** Непосредственно DOM узел, которые в конечном счете рендерит элемент */
    ref: HTMLElement | Text | null;

    props?: AppElementProps<Element>;

    /**
     * Экземпляр компонента,
     * с помощью которого можно будет вызывать функции жизненного цикла
     */
    instance: AppComponentType<AppElementProps, Record<string, never>> | null;
}
