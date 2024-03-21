import type { AppComponentType, SetStateFunction } from './AppComponent.types';

import { updateElement } from '@/appCore/app-dom/updateElement';
import type { AppNode, AppNodeElement } from '@/appCore/shared/AppNode.types';
import { isEqual } from '@/utils/isEqual';

export abstract class AppComponent<
    Props extends object | undefined,
    State = Record<string, never>,
> implements AppComponentType<Props, State>
{
    readonly props: Props | null = null;

    state: State | null = null;

    ref: HTMLElement | Text | null = null;

    owner: AppNodeElement | null = null;

    instance: AppNode = null;

    constructor(props?: Props) {
        this.props = props ?? null;
    }

    setState(newState: State | ((prevState: State) => State)) {
        const prevState = { ...(this.state ?? {}) } as State;
        let gotState: State | null = null;

        if (typeof newState === 'function') {
            gotState = (newState as SetStateFunction)(this.state);
        } else {
            gotState = newState;
        }

        if (this.componentShouldUpdate(this.props, gotState)) {
            this.state = gotState;
            let parentNode: HTMLElement | null = null;
            let currOwner = this.owner;

            while (!parentNode && currOwner) {
                if (currOwner instanceof HTMLElement) {
                    parentNode = currOwner;
                    break;
                }

                if (currOwner.ref instanceof HTMLElement) {
                    parentNode = currOwner.ref;
                }

                currOwner = currOwner.owner;
            }

            if (parentNode) {
                const newInstance = this.render();

                updateElement(parentNode, newInstance, this.instance);
                this.instance = newInstance;
                this.componentDidUpdate(prevState, this.props);
            }

            return;
        }

        this.state = gotState;
    }

    componentWillMount() {}

    componentDidMount() {}

    componentDidUpdate(prevState: State | null, prevProps: Props | null) {
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
