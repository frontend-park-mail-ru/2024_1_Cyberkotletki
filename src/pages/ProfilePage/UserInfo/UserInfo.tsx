import styles from './UserInfo.module.scss';

import { routes } from '@/App/App.routes';
import type { ProfileResponse } from '@/api/user/types';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { AppComponent } from '@/core';
import { Config } from '@/shared/constants';
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
    profile?: ProfileResponse;
}

export class UserInfo extends AppComponent<UserInfoProps> {
    render() {
        const { profile, className, ...props } = this.props;

        return (
            <div className={cx('container', className)} {...props}>
                <Avatar
                    imageSrc={`${Config.BACKEND_STATIC_URL}/${profile?.avatar ?? ''}`}
                />
                <section className={cx('user-info')}>
                    <h1 className={cx('user-name')}>
                        {profile?.name || profile?.email}
                    </h1>
                    <div className={cx('info-table')}>
                        {isDefined(profile?.rating) && (
                            <span>{`Рейтинг: ${profile?.rating}`}</span>
                        )}
                        <Button outlined href={routes.profileSettings()}>
                            Настройки профиля
                        </Button>
                    </div>
                </section>
            </div>
        );
    }
}
