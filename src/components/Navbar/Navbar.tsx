import styles from './Navbar.module.scss';

import { Link } from '@/components/Link';
import { AppComponent } from '@/core';
import { HEADER_TABS } from '@/shared/constants';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface NavbarProps
    extends OmitChildren<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>
    > {
    cl?: string;
}

export class Navbar extends AppComponent<NavbarProps> {
    render() {
        const { className, ...props } = this.props;

        return (
            <nav className={cx('tabs', className)} {...props}>
                <ul className={cx('list')}>
                    {HEADER_TABS.map((tab) => (
                        <li>
                            <Link
                                href={tab.route}
                                active={window.location.pathname.startsWith(
                                    tab.route,
                                )}
                            >
                                {tab.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}
