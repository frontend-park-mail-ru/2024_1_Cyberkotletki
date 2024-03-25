import type { AppElementProps } from '@/appCore/shared/AppElementProps.type';
import type {
    AppComponentConstructor,
    AppComponentType,
} from '@/appCore/src/AppComponent.types';

/**
 * На основе этого типа создается объект из JSX разметки
 */
export interface AppElement<
    K extends keyof HTMLElementTagNameMap | AppComponentConstructor,
    Element extends HTMLElement = HTMLElement,
> {
    /** Идентифицирует DOM ноду или компонент*/
    $$typeof: symbol;

    /** Элемент, который вызвал создание элемента */
    owner: JSX.Element | null;

    /** Либо название тэга (`div`, `span` и т.д.), либо конструктор класса */
    type: K;

    /** Непосредственно DOM узел, который в конечном счете рендерит элемент */
    ref: HTMLElement | Text | null;

    /**
     * Экземпляр компонента, который получился в результате выполнения
     * `new type()`,
     * с помощью которого можно будет вызывать функции жизненного цикла
     */
    instance: AppComponentType<AppElementProps, object> | null;

    props: AppElementProps<Element> | null;

    key: symbol;
}
