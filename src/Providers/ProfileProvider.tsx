import { authService } from '@/api/auth/service';
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

            return userService
                .getProfile()
                .then((profile = {}) => {
                    this.setState((prev) => ({
                        ...prev,
                        profile,
                        isLoggedIn: true,
                    }));

                    localStorage.setItem(
                        LocalStorageKey.USER_DATA,
                        JSON.stringify(profile),
                    );

                    return profile;
                })
                .catch(() => {
                    localStorage.removeItem(LocalStorageKey.USER_DATA);

                    this.setState((prev) => ({
                        ...prev,
                        profile: undefined,
                        isLoggedIn: false,
                    }));

                    return undefined;
                });
        },
    };

    render() {
        const { children } = this.props;

        if (!this.state.getProfilePromise) {
            this.state.getProfilePromise = this.state.getProfile();
        }

        return (
            <ProfileContext.Provider
                value={{
                    profile: {
                        ...this.state,
                        getProfile: () => {
                            const promise = this.state.getProfile();

                            this.state.getProfilePromise = promise;

                            return promise;
                        },
                    },
                }}
            >
                {children}
            </ProfileContext.Provider>
        );
    }
}
