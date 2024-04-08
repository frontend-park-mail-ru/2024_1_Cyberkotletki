import styles from './ProfileSettingsPage.module.scss';

import { userService } from '@/api/user/service';
import type { ProfileResponse } from '@/api/user/types';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface ProfileSettingsPageState {
    profile?: ProfileResponse;
}

export class ProfileSettingsPage extends AppComponent<
    object,
    ProfileSettingsPageState
> {
    componentDidMount() {
        void userService.getProfile().then((profile) => {
            this.setState((prev) => ({ ...prev, profile }));
        });
    }

    render(): AppNode {
        const { profile } = this.state;

        return (
            <LayoutWithHeader>
                <div className={cx('content')}>
                    <Avatar imageSrc={profile?.avatar} />
                    <section className={cx('section')}>
                        <h1 className={cx('title')}>Редактирование профиля</h1>
                        <section className={cx('section')}>
                            <h1 className={cx('title')}>Общие данные</h1>
                            <Input label="Email" value={profile?.email} />
                            <Input label="Имя" defaultValue={profile?.name} />
                            <Button outlined>Обновить</Button>
                        </section>
                    </section>
                </div>
            </LayoutWithHeader>
        );
    }
}
