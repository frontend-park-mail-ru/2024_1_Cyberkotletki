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
import { contentService } from '@/api/content/service';
import type { SearchResponse } from '@/api/content/types';
import { icStarOutlinedUrl } from '@/assets/icons';
import { Icon } from '@/components/Icon';

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
    searchResponse?: SearchResponse;
    isSearchLoading?: boolean;
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

        void context?.profile?.getProfilePromise?.then((profile) => {
            this.setState((prev) => ({ ...prev, profile }));
        });
    }

    handleSearch = (searchString?: string) => {
        if (searchString) {
            this.setState((prev) => ({ ...prev, isSearchLoading: true }));

            void contentService
                .searchContent(searchString)
                .then((searchResponse) => {
                    this.setState((prev) => ({
                        ...prev,
                        searchResponse,
                    }));
                })
                .finally(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isSearchLoading: false,
                    }));
                });
        }
    };

    render() {
        const { className, context, ...props } = this.props;
        const {
            profile: stateProfile,
            searchOpened,
            searchResponse,
            isSearchLoading,
        } = this.state;

        const profile = context?.profile?.profile || stateProfile;

        return (
            <header className={cx('header', className)} {...props}>
                <div className={cx('header-container')}>
                    <LogoButton
                        className={cx('header-logo', {
                            'mobile-hidden': searchOpened,
                        })}
                    />
                    <div className={cx('tabs', { hidden: searchOpened })}>
                        {HEADER_TABS.map((tab) => (
                            <Link href={tab.route}>{tab.title}</Link>
                        ))}
                    </div>
                    <SearchInput
                        onOpen={this.handleSearchOpen}
                        onClose={this.handleSearchClose}
                        onSearch={this.handleSearch}
                        isLoading={isSearchLoading}
                        persons={searchResponse?.persons}
                        films={searchResponse?.content}
                        className={cx('search')}
                    />
                    {profile ? (
                        <div className={cx('avatar-container')}>
                            <Button
                                isIconOnly
                                styleType="secondary"
                                outlined
                                aria-label="Перейти в избранное"
                                title="Перейти в избранное"
                                href={routes.favourites()}
                                className={cx({
                                    'mobile-hidden': searchOpened,
                                })}
                            >
                                <Icon
                                    icon={icStarOutlinedUrl}
                                    className={cx('star-icon')}
                                />
                            </Button>
                            <button
                                className={cx('avatar-button', {
                                    'mobile-hidden': searchOpened,
                                })}
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
                                fixed
                            >
                                <div>
                                    <Link href={routes.profile()}>
                                        <Button
                                            isText
                                            styleType="secondary"
                                            outlined
                                            isFullWidth
                                            className={cx('popover-button')}
                                            aria-label="Перейти к профилю"
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
                                        aria-label="Выйти"
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
                            aria-label="Войти"
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
