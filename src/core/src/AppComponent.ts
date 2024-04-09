import type { AppComponentType, SetStateFunction } from './AppComponent.types';

import type { AppElementProps } from '@/core/shared/AppElementProps.type';
import { updateElement } from '@/core/app-dom/src/updateElement';
import type { AppNode } from '@/core/shared/AppNode.types';
import { isFunction, isPrimitive } from '@/utils';
import { isEqual } from '@/utils/isEqual';

export abstract class AppComponent<
    Props extends object = object,
    State extends object = object,
> implements AppComponentType<Props, State>
{
    readonly props: Props;

    state: State = {} as State;

    ref: HTMLElement | Text | null = null;

    owner: JSX.Element | null = null;

    instance: AppNode = null;

    constructor(props: Props) {
        this.props = props;
    }

    setState(newState: State | SetStateFunction<State>) {
        const prevState = this.state;

        let gotState: State | null = null;

        if (isFunction(newState)) {
            gotState = newState(this.state);
        } else {
            gotState = newState;
        }

        if (this.owner && this.componentShouldUpdate(this.props, gotState)) {
            this.state = gotState;

            const newInstance = this.render();

            if (!isPrimitive(newInstance)) {
                newInstance.owner = this.owner;
            }

            updateElement(newInstance, this.instance, this.owner);

            this.instance = newInstance;
            this.ref = isPrimitive(newInstance) ? null : newInstance.ref;

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

    componentShouldUpdate(newConfig: Props | null, newState: State | null) {
        const { children: oldChildren, ...oldProps } = this
            .props as AppElementProps;
        const { children: newChildren, ...newProps } =
            newConfig as AppElementProps;

        return (
            !isEqual(oldProps, newProps) ||
            !isEqual(this.state, newState) ||
            !isEqual(oldChildren, newChildren)
        );
    }

    componentWillUnmount() {}

    unmount() {
        this.ref = null;
        this.owner = null;
        this.instance = null;
    }

    abstract render(): AppNode;
}
