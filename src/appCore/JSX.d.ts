import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppElementProps } from '@/appCore/shared/AppElementProps.type';
import type { AppNode } from '@/appCore/shared/AppNode.types';

declare global {
    namespace JSX {
        type Element = AppElement;

        type IntrinsicElements = Record<string, unknown>;

        interface ElementClass<T extends HTMLElement | null = null> {
            render(props?: AppElementProps<T>): AppElement;
        }

        interface ElementAttributesProperty<
            T extends HTMLElement | null = null,
        > {
            props: AppElementProps<T>;
        }

        interface ElementChildrenAttribute {
            children: (AppNode | AppNode[])[] | AppNode;
        }
    }
}
