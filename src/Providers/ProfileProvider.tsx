import { userService } from '@/api/user/service';
import type { ProfileResponse } from '@/api/user/types';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import type { AppContext } from '@/types/Context.types';

export interface ProfileContextValues {
    profile?: ProfileResponse;
    getProfile: () => Promise<ProfileResponse>;
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
        getProfile: () =>
            userService.getProfile().then((profile = {}) => {
                this.setState((prev) => ({ ...prev, profile }));

                return profile;
            }),
    };

    render() {
        const { children } = this.props;

        return (
            <ProfileContext.Provider value={{ profile: this.state }}>
                {children}
            </ProfileContext.Provider>
        );
    }
}
