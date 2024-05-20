import styles from './Footer.module.scss';

import { icDeleteUrl, icVkLogoUrl } from '@/assets/icons';
import { Icon } from '@/components/Icon';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export type FooterProps = Omit<
    App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
    'ref' | 'children'
>;

export class Footer extends AppComponent<FooterProps> {
    render() {
        const { className, ...props } = this.props;

        return (
            <footer className={cx('footer', className)} {...props}>
                <h1>Киберкотлетки</h1>
                <Icon icon={icDeleteUrl} className={cx('x-icon')} />
                <Icon
                    icon={icVkLogoUrl}
                    aria-label="Лого ВК"
                    className={cx('logo-icon')}
                />
            </footer>
        );
    }
}
