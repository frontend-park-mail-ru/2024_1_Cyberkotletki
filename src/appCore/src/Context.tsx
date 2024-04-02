import type { AppNode } from '@/appCore/shared/AppNode.types';
import { AppComponent } from '@/appCore/src/AppComponent';
import type { AppComponentConstructor } from '@/appCore/src/AppComponent.types';

export interface ContextProviderProps<Value = object> {
    value: Value;
    children?: AppNode;
}

class ContextProvider<Value> extends AppComponent<ContextProviderProps<Value>> {
    render() {
        const children = (this.props?.children ?? []) as JSX.Element[];

        return children[0];
    }
}

export class Context<Value = object> {
    #value: Value;

    constructor(value: Value) {
        this.#value = value;
    }

    Provider = ((props: ContextProviderProps<Value>) => {
        this.#value = props.value;

        return new ContextProvider(props);
    }) as unknown as typeof ContextProvider<Value>;

    Connect<Props extends object>(Component: AppComponentConstructor<Props>) {
        return ((props: Props) => {
            const contextProp =
                props && 'context' in props && typeof props.context === 'object'
                    ? props.context
                    : {};

            return new Component({
                ...props,
                context: { ...contextProp, ...this.#value },
            });
        }) as unknown as typeof Component;
    }
}
