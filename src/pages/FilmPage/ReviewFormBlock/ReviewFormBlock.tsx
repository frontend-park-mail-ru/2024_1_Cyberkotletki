import styles from './ReviewFormBlock.module.scss';

import type { ProfileResponse } from '@/api/user/types';
import type { ReviewDetails } from '@/api/review/types';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { ReviewForm } from '@/components/ReviewForm';
import { Button } from '@/components/Button';
import { routes } from '@/App/App.routes';

const cx = concatClasses.bind(styles);

export interface ReviewFormBlockProps
    extends OmitChildren<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>
    > {
    isEdit?: boolean;
    profile?: ProfileResponse;
    reviewForEdit?: ReviewDetails;
    onSubmit: () => void;
    contentId?: number | string;
}

export class ReviewFormBlock extends AppComponent<ReviewFormBlockProps> {
    render() {
        const {
            className,
            isEdit,
            profile,
            reviewForEdit,
            onSubmit,
            contentId,
            ...props
        } = this.props;

        return (
            <section className={cx('write-review-block', className)} {...props}>
                <h1>
                    {reviewForEdit ? 'Редактировать отзыв:' : 'Написать отзыв:'}
                </h1>
                {profile ? (
                    <ReviewForm
                        key={isEdit ? 'isEdit' : undefined}
                        profile={profile}
                        contentId={+(contentId ?? 0)}
                        onSubmit={onSubmit}
                        isEdit={isEdit}
                        reviewID={reviewForEdit?.id}
                        {...reviewForEdit}
                    />
                ) : (
                    <div>
                        <p>
                            Чтобы оставить отзыв, необходимо{' '}
                            <b>авторизоваться</b>
                        </p>
                        <Button
                            href={routes.login()}
                            className={cx('login-button')}
                        >
                            Войти
                        </Button>
                    </div>
                )}
            </section>
        );
    }
}
