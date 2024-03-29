import type { AppComponentType, SetStateFunction } from './AppComponent.types';

import { updateElement } from '@/appCore/app-dom/src/updateElement';
import type { AppNode } from '@/appCore/shared/AppNode.types';
import { isFunction } from '@/utils';
import { isEqual } from '@/utils/isEqual';

export abstract class AppComponent<
    Props extends object | null | undefined = object,
    State extends object = object,
> implements AppComponentType<Props, State>
{
    readonly props: Props | null = null;

    state: State = {} as State;

    ref: HTMLElement | Text | null = null;

    owner: JSX.Element | null = null;

    instance: AppNode = null;

    constructor(props?: Props) {
        this.props = props ?? null;
    }

    setState(newState: State | SetStateFunction<State>) {
        const prevState = this.state;
        let gotState: State | null = null;

        if (isFunction(newState)) {
            gotState = newState(this.state);
        } else {
            gotState = newState;
        }

        if (this.componentShouldUpdate(this.props, gotState)) {
            this.state = gotState;
            const newInstance = this.render();

            updateElement(newInstance, this.instance, this.owner);
            this.instance = newInstance;
            this.componentDidUpdate(prevState, this.props);

            return;
        }

        this.state = gotState;
    }

    componentWillMount() {}

    componentDidMount() {}

    componentDidUpdate(prevState: State | null, prevProps: Props | null) {
        // ? Это нужно, чтобы сделать вид, что переменные используются
        void prevState;
        void prevProps;
    }

    componentShouldUpdate(newProps: Props | null, newState: State | null) {
        return !isEqual(this.props, newProps) || !isEqual(this.state, newState);
    }

    componentWillUnmount() {}

    unmount() {
        this.ref = null;
        this.owner = null;
        this.instance = null;
    }

    abstract render(): JSX.Element;
}
