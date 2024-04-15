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

class LinkClass extends AppComponent<LinkProps> {
    render(): AppNode {
        const { context, className, href, ...props } = this.props;

        const handleClick = (
            e: App.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ) => {
            e.preventDefault();

            context?.history?.changeRoute(href ?? '');

            return false;
        };

        return (
            <a
                className={cx('link', className)}
                onClick={handleClick}
                href={href}
                {...props}
            />
        );
    }
}

export const Link = HistoryContext.Connect(LinkClass);
