import { Component } from './Component.js';

export class Context {
    value;

    /**
     *
     * @param {Object} value
     */
    constructor(value) {
        if (typeof value === 'object') {
            this.value = value;
        }
    }

    /**
     *
     * @param {Object} value
     * @param {Array<Component|Node|string|number>} children
     */
    Provider(value, ...children) {
        if (typeof value === 'object') {
            this.value = value;
        }

        if (children) {
            return new Component({ children });
        }

        return null;
    }

    /**
     *
     * @param {(props)=>Component} renderElement
     * @returns
     */
    Connect(renderElement) {
        return (props) => {
            if (
                props &&
                typeof props === 'object' &&
                'context' in props &&
                typeof props.context === 'object'
            ) {
                return renderElement({
                    ...props,
                    context: { ...props.context, ...this.value },
                });
            }

            return renderElement({
                ...props,
                context: this.value,
            });
        };
    }

    contextDidChange() {}
}
