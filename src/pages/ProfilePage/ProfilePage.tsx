import { UserInfo } from './UserInfo';

import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';

export class ProfilePage extends AppComponent<object> {
    render(): AppNode {
        return (
            <LayoutWithHeader>
                <UserInfo key="profile-page" />
            </LayoutWithHeader>
        );
    }
}
