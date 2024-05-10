import styles from './ProfileSettingsPage.module.scss';
import { BaseDataForm } from './BaseDataForm';
import { PasswordsForm } from './PasswordsForm';

import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses } from '@/utils';
import { Button } from '@/components/Button';
import { authService } from '@/api/auth/service';
import { UploadAvatar } from '@/pages/ProfileSettingsPage/AppLoadAvatar';
import { HistoryContext } from '@/Providers/HistoryProvider';
import type { AppContext } from '@/types/Context.types';
import { routes } from '@/App/App.routes';
import { ProfileContext } from '@/Providers/ProfileProvider';
import type { ProfileResponse } from '@/api/user/types';

const cx = concatClasses.bind(styles);

export interface ProfileSettingsPageProps {
    context?: AppContext;
}

export interface ProfileSettingsPageState {
    profile?: ProfileResponse;
}

class ProfileSettingsPageInnerClass extends AppComponent<
    ProfileSettingsPageProps,
    ProfileSettingsPageState
> {
    handleLogoutAllClick = () => {
        const { history } = this.props.context ?? {};

        void Promise.all([authService.logout(), authService.logoutAll()]).then(
            () => {
                history?.changeRoute(routes.root());

                window.location.reload();
            },
        );
    };

    loadProfile = (isForce?: boolean) => {
        const { profile } = this.props.context ?? {};

        const promise = isForce
            ? profile?.getProfile()
            : profile?.getProfilePromise;

        void promise?.then((profile) => {
            this.setState((prev) => ({ ...prev, profile }));
        });
    };

    componentDidMount(): void {
        const { profile } = this.props.context ?? {};

        if (!profile?.profile) {
            this.loadProfile();
        }
    }

    render(): AppNode {
        const { context } = this.props;

        const { profile: stateProfile } = this.state;

        const profile = context?.profile?.profile || stateProfile;

        return (
            <div className={cx('content')}>
                <UploadAvatar imageSrc={profile?.avatar} />
                <section className={cx('section')}>
                    <h1 className={cx('title')} style="text-align:center">
                        Редактирование профиля
                    </h1>
                    <section className={cx('section')}>
                        <h1 className={cx('title')}>Общие данные</h1>
                        <BaseDataForm
                            nameInitial={profile?.name}
                            emailInitial={profile?.email}
                            onSubmit={() => this.loadProfile(true)}
                        />
                    </section>
                    <section className={cx('section')}>
                        <h1 className={cx('title')}>Обновление пароля</h1>
                        <PasswordsForm />
                    </section>
                    <section className={cx('section', 'logout')}>
                        <h1 className={cx('title')}>Выход со всех устройств</h1>
                        <p>Вы выйдите из аккаунта со всех устройств</p>
                        <Button
                            outlined
                            onClick={this.handleLogoutAllClick}
                            styleType="secondary"
                        >
                            Выйти со всех устройств
                        </Button>
                    </section>
                </section>
            </div>
        );
    }
}

export const ProfileSettingsInnerPage = ProfileContext.Connect(
    HistoryContext.Connect(ProfileSettingsPageInnerClass),
);

export class ProfileSettingsPage extends AppComponent {
    render() {
        return (
            <LayoutWithHeader>
                <ProfileSettingsInnerPage />
            </LayoutWithHeader>
        );
    }
}
