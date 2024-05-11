import styles from './UserInfo.module.scss';

import { routes } from '@/App/App.routes';
import { ProfileContext } from '@/Providers/ProfileProvider';
import { reviewService } from '@/api/review/service';
import type { ReviewDetails } from '@/api/review/types';
import type { ProfileResponse } from '@/api/user/types';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { ReviewCard } from '@/components/ReviewCard';
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
    recentReviews?: ReviewDetails[];
}

export class UserInfoClass extends AppComponent<UserInfoProps, UserInfoState> {
    isLoading = false;

    loadData = () => {
        const { profile } = this.props.context ?? {};

        if (!isDefined(profile?.isLoggedIn) && !this.isLoading) {
            this.isLoading = true;
            void profile?.getProfilePromise
                ?.then((profile) => {
                    this.setState((prev) => ({ ...prev, profile }));

                    if (isDefined(profile?.id)) {
                        this.loadRecentReviews(profile.id);
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                });
        } else if (
            isDefined(profile?.profile?.id) &&
            !this.state.recentReviews
        ) {
            this.loadRecentReviews(profile.profile?.id);
        }
    };

    loadRecentReviews = (id: number) => {
        void reviewService
            .getMyRecentReviews(id)
            .then((reviews) => {
                this.setState((prev) => ({
                    ...prev,
                    recentReviews: reviews?.reviews,
                }));
            })
            .catch(() => {
                this.setState((prev) => ({
                    ...prev,
                    recentReviews: [],
                }));
            });
    };

    componentDidMount() {
        this.loadData();
    }

    render() {
        this.loadData();

        const { className, context, ...props } = this.props;
        const { profile: stateProfile, recentReviews } = this.state;

        const profile = context?.profile?.profile || stateProfile;

        return (
            <div className={cx('container', className)} {...props}>
                <div className={cx('main-info')}>
                    <Avatar imageSrc={profile?.avatar} />
                    <section className={cx('user-info')}>
                        <h1 className={cx('user-name')}>
                            {profile?.name || profile?.email}
                        </h1>
                        <div className={cx('info-table')}>
                            {/* // ? Soon... */}
                            {/* {isDefined(profile?.rating) && (
                                <span>{`Рейтинг: ${profile?.rating}`}</span>
                            )} */}
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
                <section className={cx('reviews-block')}>
                    <h1>Последние отзывы:</h1>
                    <div className={cx('reviews-list')}>
                        {recentReviews?.length ? (
                            recentReviews?.map((review) => (
                                <ReviewCard
                                    className={cx('review-card')}
                                    review={review}
                                    isSmall
                                />
                            ))
                        ) : (
                            <div>Вы еще не оставляли отзывы</div>
                        )}
                    </div>
                </section>
            </div>
        );
    }
}

export const UserInfo = ProfileContext.Connect(UserInfoClass);
