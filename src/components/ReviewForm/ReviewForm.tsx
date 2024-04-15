import styles from './ReviewForm.module.scss';
import { validateReviewForm } from './ReviewForm.utils';

import { reviewService } from '@/api/review/service';
import type { Review } from '@/api/review/types';
import type { ProfileResponse } from '@/api/user/types';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { AuthFormError } from '@/components/LoginForm/Form/Form.constants';
import { RadioRating } from '@/components/ReviewForm/RadioRating';
import { AppComponent } from '@/core';
import { concatClasses, isDefined } from '@/utils';
import { CheckMark } from '@/components/CheckMark';
import { ResponseError } from '@/api/appFetch';
import { ErrorMessage } from '@/components/ErrorMessage';

const cx = concatClasses.bind(styles);

export interface ReviewFormState {
    ratingError?: string;
    titleError?: string;
    textError?: string;
    isLoading?: boolean;
    isSuccess?: boolean;
    error?: string;
}

export interface ReviewFormProps {
    profile?: ProfileResponse;
    contentId?: number;
}

export const REVIEW_FORM_VALUES: Record<
    'RATING' | 'TEXT' | 'TITLE',
    keyof Review
> = {
    RATING: 'rating',
    TEXT: 'text',
    TITLE: 'title',
};

export class ReviewForm extends AppComponent<ReviewFormProps, ReviewFormState> {
    handleSubmitForm = (e: App.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = Object.fromEntries(formData) as unknown as Review;

        const { isValid, ...validation } = validateReviewForm(body);

        if (!isValid) {
            this.setState((prev) => ({ ...prev, ...validation }));

            return false;
        }

        this.setState((prev) => ({ ...prev, isLoading: true }));

        if (isDefined(this.props.contentId)) {
            void reviewService
                .createReview({
                    ...body,
                    rating: +body.rating,
                    contentID: this.props.contentId,
                })
                .then(() => {
                    this.setState((prev) => ({ ...prev, isSuccess: true }));
                })
                .catch((error) => {
                    this.setState((prev) => ({
                        ...prev,
                        isSuccess: false,
                        error:
                            error instanceof ResponseError ? error.message : '',
                    }));
                })
                .finally(() => {
                    this.setState((prev) => ({ ...prev, isLoading: false }));
                });
        }
    };

    handleInputTitle = (e: App.FormEvent<HTMLInputElement>) => {
        if (this.state.titleError && e.currentTarget.value) {
            this.setState((prev) => ({ ...prev, titleError: '' }));
        }
    };

    handleChangeTitle = (e: App.ChangeEvent<HTMLInputElement>) => {
        const titleError = e.currentTarget.value
            ? ''
            : AuthFormError.EMPTY_VALUE;

        this.setState((prev) => ({ ...prev, titleError }));
    };

    handleInputText = (e: App.FormEvent<HTMLTextAreaElement>) => {
        if (this.state.textError && e.currentTarget.value) {
            this.setState((prev) => ({ ...prev, titleError: '' }));
        }
    };

    handleChangeText = (e: App.ChangeEvent<HTMLTextAreaElement>) => {
        const textError = e.currentTarget.value
            ? ''
            : AuthFormError.EMPTY_VALUE;

        this.setState((prev) => ({ ...prev, textError }));
    };

    render() {
        const { profile } = this.props;
        const {
            textError,
            titleError,
            ratingError,
            isSuccess,
            error,
            isLoading,
        } = this.state;

        return (
            <form onSubmit={this.handleSubmitForm} className={cx('form')}>
                <div className={cx('top')}>
                    <Avatar
                        imageSrc={profile?.avatar}
                        className={cx('avatar')}
                        width="64px"
                        height="64px"
                    />
                    <RadioRating
                        name={REVIEW_FORM_VALUES.RATING}
                        required
                        hasError={!!ratingError}
                        errorHint={ratingError}
                    />
                </div>
                <Input
                    label="Заголовок"
                    name={REVIEW_FORM_VALUES.TITLE}
                    required
                    hasError={!!titleError}
                    errorHint={titleError}
                    onInput={this.handleInputTitle}
                    onChange={this.handleChangeTitle}
                    placeholder="Введите заголовок"
                />
                <Input
                    label="Текст"
                    inputType="textarea"
                    name={REVIEW_FORM_VALUES.TEXT}
                    required
                    hasError={!!textError}
                    errorHint={textError}
                    onInput={this.handleInputText}
                    onChange={this.handleChangeText}
                    placeholder="Введите текст"
                />
                <Button type="submit" isLoading={isLoading} outlined>
                    Опубликовать
                    <CheckMark show={isSuccess} />
                </Button>
                {!!error && <ErrorMessage message={error} />}
            </form>
        );
    }
}
