import { createAppElement } from './createAppElement';
import { createDOMElement } from './createDOMElement';

import type { AppComponentConstructor } from '@/appCore/src/AppComponent.types';
import type { AppElementProps } from '@/appCore/shared/AppElementProps.type';

export const createElementFromJSX = <
    T extends keyof HTMLElementTagNameMap,
    Props extends AppElementProps<HTMLElementTagNameMap[T]> | AppElementProps,
>(
    type: T | AppComponentConstructor,
    props: Props,
    maybeKey?: string,
) => {
    switch (typeof type) {
        case 'string':
            return createDOMElement(
                type,
                props as AppElementProps<HTMLElementTagNameMap[T]>,
                maybeKey,
            );
        case 'function':
            return createAppElement(type, props as AppElementProps, maybeKey);
        default:
            return null;
    }
};
