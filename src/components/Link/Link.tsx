import { HistoryContext } from '@/Providers/HistoryProvider';
import type { AppNode } from '@/core/shared/AppNode.types';
import { AppComponent } from '@/core';
import type { AppContext } from '@/types/Context.types';

export interface LinkProps
    extends App.DetailedHTMLProps<
        App.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    > {
    context?: AppContext;
}
export interface LinkState {
    handleClick: (e: App.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

class LinkClass extends AppComponent<LinkProps, LinkState> {
    componentWillMount() {
        const { context, href } = this.props;

        this.state.handleClick = (e) => {
            e.preventDefault();

            context?.history?.changeRoute(href ?? '');

            return false;
        };
    }

    render(): AppNode {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { context, ...props } = this.props;

        return <a onClick={this.state.handleClick} {...props} />;
    }
}

export const Link = HistoryContext.Connect(LinkClass);
