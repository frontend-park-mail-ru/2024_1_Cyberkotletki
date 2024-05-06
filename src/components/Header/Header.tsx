import styles from './Header.module.scss';

import { AppComponent } from '@/core';
import { LogoButton } from '@/components/LogoButton';
import { concatClasses } from '@/utils';
import type { AppContext } from '@/types/Context.types';
import { Button } from '@/components/Button';
import { HistoryContext } from '@/Providers/HistoryProvider';
import { routes } from '@/App/App.routes';
import { authService } from '@/api/auth/service';
import { ProfileContext } from '@/Providers/ProfileProvider';
import { Avatar } from '@/components/Avatar';
import type { ProfileResponse } from '@/api/user/types';
import { HEADER_TABS, LocalStorageKey } from '@/shared/constants';
import { SearchInput } from '@/components/SearchInput';
import { Popover } from '@/components/Popover';
import { Link } from '@/components/Link';

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
    searchOpened?: boolean;
}

class HeaderClass extends AppComponent<HeaderProps, HeaderState> {
    state: HeaderState = {
        profile: JSON.parse(
            localStorage.getItem(LocalStorageKey.USER_DATA) ?? 'null',
        ) as ProfileResponse,
    };

    handleSearchOpen = () => {
        this.setState((prev) => ({ ...prev, searchOpened: true }));
    };

    handleSearchClose = () => {
        this.setState((prev) => ({ ...prev, searchOpened: false }));
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

    componentDidMount(): void {
        const { context } = this.props;

        if (!context?.profile?.profile || !this.state.profile) {
            void context?.profile?.getProfile().then((profile) => {
                this.setState((prev) => ({ ...prev, profile }));
            });
        }
    }

    render() {
        const { className, context, ...props } = this.props;
        const { profile: stateProfile, searchOpened } = this.state;

        const profile = context?.profile?.profile || stateProfile;

        return (
            <header className={cx('header', className)} {...props}>
                <div className={cx('header-container')}>
                    <LogoButton
                        className={cx('header-logo', {
                            'mobile-hidden': searchOpened,
                        })}
                    />
                    {/** //? Soon... */}
                    <div className={cx('tabs')}>
                        {HEADER_TABS.map((tab) => (
                            <Link
                                href={tab.route}
                                className={cx({ hidden: searchOpened })}
                            >
                                {tab.title}
                            </Link>
                        ))}
                        <SearchInput
                            onOpen={this.handleSearchOpen}
                            onClose={this.handleSearchClose}
                        />
                    </div>
                    {profile ? (
                        <div
                            className={cx('avatar-container', {
                                'mobile-hidden': searchOpened,
                            })}
                        >
                            <button
                                className={cx('avatar-button')}
                                popoverTarget="profile-popover"
                                popoverTargetAction="toggle"
                            >
                                <Avatar
                                    className={cx('avatar')}
                                    imageSrc={profile?.avatar}
                                />
                            </button>
                            <Popover
                                id="profile-popover"
                                width="fit"
                                horizonPos="right"
                            >
                                <div>
                                    <Link href={routes.profile()}>
                                        <Button
                                            isText
                                            styleType="secondary"
                                            outlined
                                            isFullWidth
                                            className={cx('popover-button')}
                                        >
                                            Профиль
                                        </Button>
                                    </Link>
                                    <Button
                                        isText
                                        styleType="error"
                                        outlined
                                        isFullWidth
                                        onClick={this.handleLogoutClick}
                                        size="small"
                                        className={cx('popover-button')}
                                    >
                                        Выйти
                                    </Button>
                                </div>
                            </Popover>
                        </div>
                    ) : (
                        <Button
                            outlined
                            onClick={this.handleLoginClick}
                            styleType="secondary"
                            style="width: fit-content;"
                            className={cx({
                                'mobile-hidden': searchOpened,
                            })}
                        >
                            Войти
                        </Button>
                    )}
                </div>
            </header>
        );
    }
}

export const Header = ProfileContext.Connect(
    HistoryContext.Connect(HeaderClass),
);
