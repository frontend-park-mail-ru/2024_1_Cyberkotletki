import styles from './Header.module.scss';

import { AppComponent } from '@/core';
import { LogoButton } from '@/components/LogoButton';
import { concatClasses } from '@/utils';
import type { AppContext } from '@/types/Context.types';
import { Button } from '@/components/Button';
import { routes } from '@/App/App.routes';
import { authService } from '@/api/auth/service';
import { Link } from '@/components/Link';
import { Avatar } from '@/components/Avatar';
import type { ProfileResponse } from '@/api/user/types';

const cx = concatClasses.bind(styles);

export interface HeaderProps
    extends Omit<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
        'ref' | 'children'
    > {
    context?: AppContext;
}

export interface HeaderState {
    profile?: ProfileResponse;
}

class HeaderClass extends AppComponent<HeaderProps, HeaderState> {
    state: HeaderState = {
        // profile: JSON.parse(
        //     localStorage.getItem(LocalStorageKey.USER_DATA) ?? 'null',
        // ) as ProfileResponse,
    };

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

    // componentDidMount(): void {
    //     const { context } = this.props;

    //     if (!context?.profile?.profile || !this.state.profile) {
    //         void context?.profile?.getProfile().then((profile) => {
    //             this.setState((prev) => ({ ...prev, profile }));
    //         });
    //     }
    // }

    render() {
        const { className, context, ...props } = this.props;
        const { profile: stateProfile } = this.state;

        const profile = context?.profile?.profile || stateProfile;

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
                    {profile ? (
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
                        <Button
                            outlined
                            onClick={this.handleLoginClick}
                            styleType="secondary"
                            style="width: fit-content;"
                        >
                            Войти
                        </Button>
                    )}
                </div>
            </header>
        );
    }
}

export const Header = HeaderClass;
