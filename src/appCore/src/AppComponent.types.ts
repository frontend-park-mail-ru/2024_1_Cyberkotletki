import type { AppComponent } from './AppComponent';

import type { AppNode } from '@/appCore/shared/AppNode.types';

export type AppComponentConstructor<
    Props extends object | undefined | null = object,
> = new (props?: Props) => AppComponent<Props>;

export type SetStateFunction<State> = (prevState: State) => State;

export interface AppComponentType<
    Props extends object | null | undefined,
    State,
> {
    /** Пропсы, которые передаются извне */
    readonly props: Props | null;

    /** Внутреннее состояние компонента */
    state: State | null;

    /** Непосредственно DOM узел, который в конечном счете рендерит элемент */
    ref: HTMLElement | Text | null;

    /** Компонент, ответственный за создание этого компонента */
    owner: JSX.Element | null;

    /** Результат выполнения функции `render` */
    instance: AppNode;

    /**
     * Устанавливает новое состояние и вызывает новый рендр
     * @param newState Либо новое состояние,
     * либо функция, возвращающая новое состояние
     */
    setState(newState: State | SetStateFunction<State>): void;

    /**
     * Вызывается перед вызовом функции `render()`
     */
    componentWillMount(): void;

    /**
     * Вызывается после вызова функции `render()`
     */
    componentDidMount(): void;

    /**
     * Вызывается при изменении пропсов или состояния, при условии,
     * что `componentShouldUpdate() === true`
     */
    componentDidUpdate(prevState: State | null, prevProps: Props | null): void;

    /**
     * Вызывается до вызова функции `unmount` и удаления элемента из DOM дерева
     */
    componentWillUnmount(): void;

    /**
     * Указывает на основе нового состояние и пропсов,
     * нужно ли делать новый рендр
     * @param newProps Новые пропсы
     * @param newState Новое состояние
     */
    componentShouldUpdate(
        newProps: Props | null,
        newState: State | null,
    ): boolean;

    unmount(): void;

    /**
     * Возвращает JSX
     */
    render(): JSX.Element;
}
