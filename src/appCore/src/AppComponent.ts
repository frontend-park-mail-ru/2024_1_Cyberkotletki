import type {
    AppComponentConstructor,
    AppComponentType,
} from './AppComponent.types';

import type { AppElement } from '@/appCore/shared/AppElement.type';
import type { AppElementProps } from '@/appCore/shared/AppElementProps.type';

export abstract class AppComponent<
    Props extends AppElementProps | null = null,
    State = Record<string, never>,
> implements AppComponentType<Props, State>
{
    readonly props: Props | null = null;

    readonly state: State | null = null;

    constructor(props?: Props) {
        this.props = props ?? null;
    }

    componentDidMount() {}

    componentDidUpdate() {}

    componentShouldUpdate() {
        return true;
    }

    componentWillUnmount() {}

    unmount() {}

    abstract render(): AppElement<AppComponentConstructor>;
}
