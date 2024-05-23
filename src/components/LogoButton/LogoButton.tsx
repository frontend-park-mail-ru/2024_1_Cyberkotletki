import styles from './LogoButton.module.scss';

import { routes } from '@/App/App.routes';
import { AppComponent } from '@/core';
import { icLogoTextUrl, icLogoUrl } from '@/assets/icons';
import { Link } from '@/components/Link';
import type { LinkProps } from '@/components/Link/Link';
import { Icon } from '@/components/Icon';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface LogoButtonProps
    extends Omit<LinkProps, 'children' | 'href' | 'ref'> {
    withText?: boolean;
}

export class LogoButton extends AppComponent<LogoButtonProps> {
    render() {
        const { className, withText, ...props } = this.props;

        return (
            <Link
                {...props}
                className={cx('link', className)}
                href={routes.root()}
                aria-label="На главную страницу"
            >
                <Icon icon={icLogoUrl} className={cx('icon', 'logo')} />
                {withText && (
                    <Icon icon={icLogoTextUrl} className={cx('icon', 'text')} />
                )}
            </Link>
        );
    }
}
