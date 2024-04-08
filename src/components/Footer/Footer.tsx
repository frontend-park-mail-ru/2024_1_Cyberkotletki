import styles from './Footer.module.scss';

import { icDeleteUrl, icVkLogoUrl } from '@/assets/icons';
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
                <img src={icDeleteUrl} />
                <img src={icVkLogoUrl} />
            </footer>
        );
    }
}
