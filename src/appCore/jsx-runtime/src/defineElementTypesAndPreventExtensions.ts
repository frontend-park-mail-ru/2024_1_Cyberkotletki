import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppComponentConstructor } from '@/appCore/src/AppComponent.types';

export const defineElementTypesAndPreventExtensions = <
    K extends keyof HTMLElementTagNameMap | AppComponentConstructor,
>(
    object: object,
    { $$typeof, type }: Pick<AppElement<K>, '$$typeof' | 'type'>,
) => {
    Object.defineProperties(object, {
        $$typeof: {
            value: $$typeof,
            writable: false,
            configurable: false,
            enumerable: true,
        },
        type: {
            value: type,
            writable: false,
            configurable: false,
            enumerable: true,
        },
    });

    Object.preventExtensions(object);
};
