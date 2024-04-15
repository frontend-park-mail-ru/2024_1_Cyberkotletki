import styles from './Header.module.scss';

import { AppComponent } from '@/core';
import { LogoButton } from '@/components/LogoButton';
import { concatClasses } from '@/utils';
import type { AppContext } from '@/types/Context.types';
import { Button } from '@/components/Button';
import { HistoryContext } from '@/Providers/HistoryProvider';
import { routes } from '@/App/App.routes';
import { authService } from '@/api/auth/service';
import { Link } from '@/components/Link';
import { AuthContext } from '@/Providers/AuthProvider';
import { ProfileContext } from '@/Providers/ProfileProvider';
import { Avatar } from '@/components/Avatar';
import type { ProfileResponse } from '@/api/user/types';

const cx = concatClasses.bind(styles);

export interface HeaderProps
    extends Omit<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
        'ref' | 'children'
    > {
    context?: AppContext;
    isLoggedIn?: boolean;
}

export interface HeaderState {
    isLoggedIn?: boolean;
    profile?: ProfileResponse;
}

class HeaderClass extends AppComponent<HeaderProps, HeaderState> {
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

    componentDidMount(): void {
        const { context } = this.props;

        if (!context?.profile?.profile) {
            void context?.profile?.getProfile().then((profile) => {
                this.setState((prev) => ({ ...prev, profile }));
            });
        }

        if (!context?.auth?.isLoggedIn) {
            void context?.auth?.getIsAuth().then((isLoggedIn) => {
                this.setState((prev) => ({ ...prev, isLoggedIn }));
            });
        }
    }

    render() {
        const { className, context, ...props } = this.props;
        const { profile: stateProfile, isLoggedIn: stateIsLoggedIn } =
            this.state;

        const profile = context?.profile?.profile || stateProfile;
        const isLoggedIn = context?.auth?.isLoggedIn || stateIsLoggedIn;

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
                    {isLoggedIn ? (
                        <div className={cx('avatar-container')}>
                            <div
                                className={cx('logout-button')}
                                onClick={this.handleLogoutClick}
                                role="button"
                            >
                                Выйти
                            </div>
                            <Link href={routes.profile()}>
                                <Avatar
                                    className={cx('avatar')}
                                    imageSrc={profile?.avatar}
                                />
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

export const Header = ProfileContext.Connect(
    AuthContext.Connect(HistoryContext.Connect(HeaderClass)),
);
