import type { AppNode } from '@/core/shared/AppNode.types';
import { AppComponent } from '@/core';
import { hasField } from '@/utils';
import type { ContextProps } from '@/types/Context.types';

export interface ContextProviderProps<Value = object> extends ContextProps {
    value: Value;
    children?: AppNode;
}

class ContextProvider<Value> extends AppComponent<ContextProviderProps<Value>> {
    render() {
        const children = (this.props?.children ?? []) as JSX.Element[];

        const child = children[0];

        child.props.context = hasField(child.props, 'context')
            ? {
                  ...child.props.context,
                  ...this.props.context,
              }
            : this.props.context;

        return children[0];
    }
}

export class Context<Value extends object = object> {
    #value: Value;

    constructor(value: Value) {
        this.#value = value;
    }

    Provider = ((props: ContextProviderProps<Value>) => {
        this.#value = props.value;

        const context = hasField(props, 'context', 'object')
            ? { ...props.context, ...this.#value }
            : this.#value;

        return new ContextProvider({ ...props, context: context as object });
    }) as unknown as typeof ContextProvider<Value>;
}
