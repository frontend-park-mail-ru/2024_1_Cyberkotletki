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
import { HEADER_TABS } from '@/shared/constants';
import { Link } from '@/components/Link';

const cx = concatClasses.bind(styles);

export interface AppComponentProps
    extends Omit<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
        'ref' | 'children'
    > {
    context?: AppContext;
}

export interface AppComponentState {
    handleLoginClick: () => void;
    handleLogoutClick: () => void;
}

class HeaderClass extends AppComponent<AppComponentProps, AppComponentState> {
    constructor(props: AppComponentProps) {
        super(props);

        const { context } = this.props;

        this.state.handleLoginClick = () => {
            context?.history?.changeRoute(routes.login());
        };

        this.state.handleLogoutClick = () => {
            void authService.logout().then(() => {
                window.location.reload();
            });
        };
    }

    render() {
        const { context, className, ...props } = this.props;

        return (
            <header className={cx('header', className)} {...props}>
                <div className={cx('header-container')}>
                    <LogoButton className={cx('header-logo')} />
                    <div className={cx('tabs')}>
                        {HEADER_TABS.map((tab) => (
                            <Link href={tab.route}>{tab.title}</Link>
                        ))}
                    </div>
                    {context?.auth?.isLoggedIn ? (
                        <div className={cx('avatar')}>
                            <div
                                className={cx('logout-button')}
                                onClick={this.state.handleLogoutClick}
                                role="button"
                            >
                                Выйти
                            </div>
                            <Link href={routes.profile()}>
                                <img src={icUserCircleUrl} aria-hidden />
                            </Link>
                        </div>
                    ) : (
                        <Button outlined onClick={this.state.handleLoginClick}>
                            Войти
                        </Button>
                    )}
                </div>
            </header>
        );
    }
}

export const Header = HistoryContext.Connect(AuthContext.Connect(HeaderClass));
