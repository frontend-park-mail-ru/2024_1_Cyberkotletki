import type { AppNode } from '@/core/shared/AppNode.types';
import { AppComponent } from '@/core/src/AppComponent';

export interface ContextProviderProps<Value = object> {
    value: Value;
    children?: AppNode;
}
export class ContextProvider extends AppComponent<{
    children?: AppNode;
}> {
    render() {
        const children = (this.props?.children ?? []) as JSX.Element[];

        return children[0];
    }
}

export class Context<Value = object> {
    value: Value;

    constructor(value: Value) {
        this.value = value;
    }

    Provider = ({ value, ...props }: ContextProviderProps<Value>) => {
        this.value = value;

        return new ContextProvider(props);
    };

    Connect = <Props extends object>(
        Component: JSX.JSXElementConstructor<Props>,
    ) => {
        const ConnectFunction = (props: Props) => {
            const contextProp =
                props && 'context' in props && typeof props.context === 'object'
                    ? props.context
                    : {};

            return Component.prototype instanceof AppComponent
                ? new (Component as new (props: Props) => AppComponent)({
                      ...props,
                      context: { ...contextProp, ...this.value },
                  })
                : (Component as unknown as (props: Props) => AppComponent)({
                      ...props,
                      context: { ...contextProp, ...this.value },
                  });
        };

        return ConnectFunction;
    };
}
