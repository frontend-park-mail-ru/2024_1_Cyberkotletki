import { UserInfo } from './UserInfo';

import { ProfileContext } from '@/Providers/ProfileProvider';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import type { AppContextComponentProps } from '@/types/Context.types';

class ProfilePageClass extends AppComponent<AppContextComponentProps> {
    render(): AppNode {
        return (
            <LayoutWithHeader>
                <UserInfo key="profile-page" context={this.props.context} />
            </LayoutWithHeader>
        );
    }
}

export const ProfilePage = ProfileContext.Connect(ProfilePageClass);
