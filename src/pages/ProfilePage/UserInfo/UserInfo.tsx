import styles from './UserInfo.module.scss';

import { routes } from '@/App/App.routes';
import { ProfileContext } from '@/Providers/ProfileProvider';
import type { ProfileResponse } from '@/api/user/types';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { AppComponent } from '@/core';
import type { AppContext } from '@/types/Context.types';
import { concatClasses, isDefined } from '@/utils';

const cx = concatClasses.bind(styles);

export interface UserInfoProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref' | 'children'
    > {
    context?: AppContext;
}

export interface UserInfoState {
    profile?: ProfileResponse;
}

export class UserInfoClass extends AppComponent<UserInfoProps, UserInfoState> {
    componentDidMount(): void {
        const { profile } = this.props.context ?? {};

        if (!profile?.profile) {
            void profile?.getProfile().then((profile) => {
                this.setState((prev) => ({ ...prev, profile }));
            });
        }
    }

    render() {
        const { className, context, ...props } = this.props;
        const { profile: stateProfile } = this.state;

        const profile = context?.profile?.profile || stateProfile;

        return (
            <div className={cx('container', className)} {...props}>
                <Avatar imageSrc={profile?.avatar} />
                <section className={cx('user-info')}>
                    <h1 className={cx('user-name')}>
                        {profile?.name || profile?.email}
                    </h1>
                    <div className={cx('info-table')}>
                        {isDefined(profile?.rating) && (
                            <span>{`Рейтинг: ${profile?.rating}`}</span>
                        )}
                        <Button
                            outlined
                            href={routes.profileSettings()}
                            styleType="secondary"
                        >
                            Настройки профиля
                        </Button>
                    </div>
                </section>
            </div>
        );
    }
}

export const UserInfo = ProfileContext.Connect(UserInfoClass);
