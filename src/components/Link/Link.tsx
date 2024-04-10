import styles from './Link.module.scss';

import { HistoryContext } from '@/Providers/HistoryProvider';
import type { AppNode } from '@/core/shared/AppNode.types';
import { AppComponent } from '@/core';
import type { AppContext } from '@/types/Context.types';
import type { RoutesValues } from '@/App/App.routes';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface LinkProps
    extends Omit<
        App.DetailedHTMLProps<
            App.AnchorHTMLAttributes<HTMLAnchorElement>,
            HTMLAnchorElement
        >,
        'href'
    > {
    context?: AppContext;
    href: RoutesValues;
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
        const { context, className, ...props } = this.props;

        return (
            <a
                className={cx('link', className)}
                onClick={this.state.handleClick}
                {...props}
            />
        );
    }
}

export const Link = HistoryContext.Connect(LinkClass);