import { authService } from '@/api/auth/service';
import { contentService } from '@/api/content/service';
import { webSocketNotifications } from '@/api/content/ws';
import { userService } from '@/api/user/service';
import type { ProfileResponse } from '@/api/user/types';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import { LocalStorageKey } from '@/shared/constants';
import type { AppContext } from '@/types/Context.types';

export interface ProfileContextValues {
    profile?: ProfileResponse;
    getProfile: () => Promise<ProfileResponse | undefined>;
    getProfilePromise?: Promise<ProfileResponse | undefined>;
    isLoggedIn?: boolean;
    ongoingSubscriptions?: number[];
    loadOngoingSubscriptions: () => Promise<number[] | undefined>;
    loadOngoingSubscriptionsPromise?: Promise<number[] | undefined>;
}

export const ProfileContext = new Context<AppContext>({});

export interface ProfileProviderProps {
    children?: JSX.Element;
}

export class ProfileProvider extends AppComponent<
    ProfileProviderProps,
    ProfileContextValues
> {
    state: ProfileContextValues = {
        loadOngoingSubscriptions: () =>
            contentService.getOngoingSubscriptions().then((response) => {
                this.state.ongoingSubscriptions = response?.subscriptions;

                void Notification.requestPermission();
                webSocketNotifications(response?.subscriptions ?? []);

                return response?.subscriptions;
            }),

        getProfile: async () => {
            const isLogged = await authService.isAuth();

            if (!isLogged) {
                localStorage.removeItem(LocalStorageKey.USER_DATA);

                this.setState((prev) => ({
                    ...prev,
                    profile: undefined,
                    isLoggedIn: false,
                }));

                return undefined;
            }

            const promise = userService.getProfile();

            this.state.getProfilePromise = promise;

            return promise
                .then((profile = {}) => {
                    this.state.profile = profile;
                    this.state.isLoggedIn = true;

                    localStorage.setItem(
                        LocalStorageKey.USER_DATA,
                        JSON.stringify(profile),
                    );

                    return profile;
                })
                .catch(() => {
                    localStorage.removeItem(LocalStorageKey.USER_DATA);

                    this.state.profile = undefined;
                    this.state.isLoggedIn = false;

                    return undefined;
                });
        },
    };

    render() {
        const { children } = this.props;

        if (!this.state.getProfilePromise) {
            this.state.getProfilePromise = this.state
                .getProfile()
                .then((profile) => {
                    this.state.loadOngoingSubscriptionsPromise =
                        this.state.loadOngoingSubscriptions();

                    return profile;
                });
        }

        return (
            <ProfileContext.Provider
                value={{
                    profile: this.state,
                }}
            >
                {children}
            </ProfileContext.Provider>
        );
    }
}
