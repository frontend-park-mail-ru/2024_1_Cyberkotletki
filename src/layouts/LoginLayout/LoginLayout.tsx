import styles from './LoginLayout.module.scss';

import type { AppNode } from '@/appCore/shared/AppNode.types';
import { AppComponent } from '@/appCore/src/AppComponent';
import { LogoButton } from '@/components/LogoButton';
import { concatClasses } from '@/utils';

export type LoginLayoutProps = App.DetailedHTMLProps<
    App.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

const cx = concatClasses.bind(styles as Record<string, string | undefined>);

export class LoginLayout extends AppComponent<LoginLayoutProps> {
    render(): AppNode {
        const { className, children, ...props } = this.props ?? {};

        return (
            <div className={cx('login-layout', className)} {...props}>
                <img
                    className={cx('img-bg')}
                    aria-hidden
                    src="/src/assets/kinoskop_background.jpg"
                />
                <LogoButton className={cx('logo')} />
                {children as JSX.Children[]}
            </div>
        );
    }
}
