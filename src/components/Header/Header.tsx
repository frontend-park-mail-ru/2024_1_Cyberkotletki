import styles from './Header.module.scss';

import { AuthContext } from '@/Providers/AuthProvider';
import { AppComponent } from '@/core';
import { LogoButton } from '@/components/LogoButton';
import { concatClasses } from '@/utils';
import type { AppContext } from '@/types/Context.types';
import { icUserCircleUrl } from '@/assets/icons';
import { Button } from '@/components/Button';
import { HistoryContext } from '@/Providers/HistoryProvider';
import { routes } from '@/App/App.routes';
import { authService } from '@/api/auth/service';
import { Link } from '@/components/Link';

const cx = concatClasses.bind(styles);

export interface AppComponentProps
    extends Omit<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
        'ref' | 'children'
    > {
    context?: AppContext;
}

class HeaderClass extends AppComponent<AppComponentProps> {
    handleLoginClick = () => {
        const { context } = this.props;

        context?.history?.changeRoute(routes.login());
    };

    handleLogoutClick = () => {
        const { context } = this.props;

        void authService.logout().then(() => {
            context?.history?.changeRoute(routes.root());

            window.location.reload();
        });
    };

    render() {
        const { context, className, ...props } = this.props;

        return (
            <header className={cx('header', className)} {...props}>
                <div className={cx('header-container')}>
                    <LogoButton className={cx('header-logo')} />
                    {/** //? Soon... */}
                    {/* <div className={cx('tabs')}>
                        {HEADER_TABS.map((tab) => (
                            <Link href={tab.route}>{tab.title}</Link>
                        ))}
                    </div> */}
                    {context?.auth?.isLoggedIn ? (
                        <div className={cx('avatar')}>
                            <div
                                className={cx('logout-button')}
                                onClick={this.handleLogoutClick}
                                role="button"
                            >
                                Выйти
                            </div>
                            <Link href={routes.profile()}>
                                <img src={icUserCircleUrl} aria-hidden />
                            </Link>
                        </div>
                    ) : (
                        <Button outlined onClick={this.handleLoginClick}>
                            Войти
                        </Button>
                    )}
                </div>
            </header>
        );
    }
}

export const Header = HistoryContext.Connect(AuthContext.Connect(HeaderClass));
