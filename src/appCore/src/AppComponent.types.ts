import type { AppComponent } from './AppComponent';

import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppElementProps } from '@/appCore/shared/AppElementProps.type';

export type AppComponentConstructor = new (
    props?: AppElementProps,
) => AppComponent;

export interface AppComponentType<Props extends AppElementProps | null, State> {
    readonly props: Props | null;
    readonly state: State | null;

    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    componentShouldUpdate(): boolean;

    unmount(): void;
    render(): AppElement<AppComponentConstructor>;
}
