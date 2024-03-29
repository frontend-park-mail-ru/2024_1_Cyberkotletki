import { HistoryContext } from '@/Providers/HistoryProvider';
import type { AppNode } from '@/appCore/shared/AppNode.types';
import { AppComponent } from '@/appCore/src/AppComponent';
import type { AppContext } from '@/types/Context.types';

export interface LinkProps
    extends App.DetailedHTMLProps<
        App.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    > {
    context?: AppContext;
}

class LinkClass extends AppComponent<LinkProps> {
    render(): AppNode {
        const { context, ...props } = this.props ?? {};

        return (
            <a
                onClick={(e) => {
                    e.preventDefault();

                    context?.history.changeRoute(props.href ?? '');

                    return false;
                }}
                {...props}
            />
        );
    }
}

export const Link = HistoryContext.Connect(LinkClass);
