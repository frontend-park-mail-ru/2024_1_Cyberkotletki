import type { AppComponent } from './AppComponent';

import type { AppNode } from '@/appCore/shared/AppNode.types';

export type AppComponentConstructor = new <
    Props extends object | undefined | null = null,
>(
    props?: Props,
) => AppComponent<Props>;

export type SetStateFunction = <State>(prevState: State) => State;

export interface AppComponentType<
    Props extends object | null | undefined,
    State,
> {
    readonly props: Props | null;
    state: State | null;
    ref: HTMLElement | Text | null;
    owner: JSX.Element | null;

    /** Результат выполнения функции `render` */
    instance: AppNode;

    /**
     * Устанавливает новое состояние и вызывает новый рендр
     * @param newState Либо новое состояние,
     * либо функция, возвращающая новое состояние
     */
    setState(newState: State | SetStateFunction): void;

    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(prevState: State | null, prevProps: Props | null): void;
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
    render(): JSX.Element;
}
