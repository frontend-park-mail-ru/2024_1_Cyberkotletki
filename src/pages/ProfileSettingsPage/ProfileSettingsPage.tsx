import styles from './ProfileSettingsPage.module.scss';
import { BaseDataForm } from './BaseDataForm';
import { PasswordsForm } from './PasswordsForm';

import { userService } from '@/api/user/service';
import type { ProfileResponse } from '@/api/user/types';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses } from '@/utils';
import { Button } from '@/components/Button';
import { authService } from '@/api/auth/service';
import { UploadAvatar } from '@/pages/ProfileSettingsPage/AppLoadAvatar';
import { Config } from '@/shared/constants';

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

    handleLogoutAllClick = () => {
        void Promise.all([authService.logout(), authService.logoutAll()]).then(
            () => {
                window.location.reload();
            },
        );
    };

    render(): AppNode {
        const { profile } = this.state;

        return (
            <LayoutWithHeader>
                <div className={cx('content')}>
                    <UploadAvatar
                        imageSrc={`${Config.BACKEND_STATIC_URL}/${profile?.avatar ?? ''}`}
                    />
                    <section className={cx('section')}>
                        <h1 className={cx('title')} style="text-align:center">
                            Редактирование профиля
                        </h1>
                        <section className={cx('section')}>
                            <h1 className={cx('title')}>Общие данные</h1>
                            <BaseDataForm
                                nameInitial={profile?.name}
                                emailInitial={profile?.email}
                            />
                        </section>
                        <section className={cx('section')}>
                            <h1 className={cx('title')}>Обновление пароля</h1>
                            <PasswordsForm />
                        </section>
                        <section className={cx('section', 'logout')}>
                            <h1 className={cx('title')}>
                                Выход со всех устройств
                            </h1>
                            <p>
                                Вы выйдите из аккаунта со всех устройств,
                                включая это
                            </p>
                            <Button
                                outlined
                                onClick={this.handleLogoutAllClick}
                            >
                                Выйти со всех устройств
                            </Button>
                        </section>
                    </section>
                </div>
            </LayoutWithHeader>
        );
    }
}
