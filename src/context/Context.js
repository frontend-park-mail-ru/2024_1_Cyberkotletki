export class Context {
    #value;

    constructor(value) {
        if (typeof value === 'object') {
            this.#value = value;
        }
    }

    Provider(value, children) {
        if (typeof value === 'object') {
            this.#value = value;
        }

        if (children) {
            return children;
        }

        return null;
    }

    Connect(renderElement) {
        return (props, children) => {
            if (
                props &&
                typeof props === 'object' &&
                'getContext' in props &&
                typeof props.getContext === 'function'
            ) {
                return renderElement(
                    {
                        ...props,
                        context: this.#value,
                        getContext: () => ({
                            ...props.getContext(),
                            ...this.#value,
                        }),
                    },
                    children,
                );
            }

            return renderElement(
                {
                    ...props,
                    context: this.#value,
                    getContext: () => this.#value,
                },
                children,
            );
        };
    }
}
