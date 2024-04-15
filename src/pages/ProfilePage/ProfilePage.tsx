import { UserInfo } from './UserInfo';

import { userService } from '@/api/user/service';
import type { ProfileResponse } from '@/api/user/types';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';

export interface ProfilePageState {
    profile?: ProfileResponse;
}

export class ProfilePage extends AppComponent<object, ProfilePageState> {
    componentDidMount() {
        void userService.getProfile().then((profile) => {
            this.setState((prev) => ({ ...prev, profile }));
        });
    }

    render(): AppNode {
        const { profile } = this.state;

        return (
            <LayoutWithHeader>
                <UserInfo profile={profile} />
            </LayoutWithHeader>
        );
    }
}
