import styles from './LoginLayout.module.scss';

import { AppComponent } from '@/core';
import { LogoButton } from '@/components/LogoButton';
import { concatClasses } from '@/utils';

export type LoginLayoutProps = App.DetailedHTMLProps<
    App.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

const cx = concatClasses.bind(styles as Record<string, string | undefined>);

export class LoginLayout extends AppComponent<LoginLayoutProps> {
    render() {
        const { className, children, ...props } = this.props;

        return (
            <div className={cx('login-layout', className)} {...props}>
                <img
                    loading="eager"
                    decoding="async"
                    className={cx('img-bg')}
                    aria-hidden
                    src="/src/assets/kinoskop_background.webp"
                />
                <LogoButton className={cx('logo')} withText />
                {children}
            </div>
        );
    }
}
