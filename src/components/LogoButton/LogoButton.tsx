import styles from './LogoButton.module.scss';

import { routes } from '@/App/App.routes';
import { AppComponent } from '@/core';
import { icLogoUrl } from '@/assets/icons';
import { Link } from '@/components/Link';
import type { LinkProps } from '@/components/Link/Link';
import { Icon } from '@/components/Icon';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export type LogoButtonProps = Omit<LinkProps, 'children' | 'href' | 'ref'>;

export class LogoButton extends AppComponent<LogoButtonProps> {
    render() {
        const { className, ...props } = this.props;

        return (
            <Link
                {...props}
                className={cx('link', className)}
                href={routes.root()}
                aria-label="На главную страницу"
            >
                <Icon icon={icLogoUrl} />
                <span className={cx('text')}>иноскоп</span>
            </Link>
        );
    }
}
