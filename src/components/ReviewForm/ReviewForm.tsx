import styles from './ReviewForm.module.scss';
import {
    getReviewFormTextError,
    getReviewFormTitleError,
    validateReviewForm,
} from './ReviewForm.utils';
import { ReviewFormError } from './ReviewForm.constants';

import { ReviewError, reviewService } from '@/api/review/service';
import type { CreateReviewBody, UpdateReviewBody } from '@/api/review/types';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { RadioRating } from '@/components/ReviewForm/RadioRating';
import { AppComponent } from '@/core';
import { concatClasses, isDefined } from '@/utils';
import { CheckMark } from '@/components/CheckMark';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { ProfileResponse } from '@/api/user/types';

const cx = concatClasses.bind(styles);

export interface ReviewFormState {
    ratingError?: string;
    titleError?: string;
    textError?: string;
    isLoading?: boolean;
    isSuccess?: boolean;
    error?: string;
}

export interface ReviewFormProps extends Partial<UpdateReviewBody> {
    contentId?: number;
    onSubmit?: () => void;
    isEdit?: boolean;
    profile?: ProfileResponse;
}

export const REVIEW_FORM_VALUES: Record<
    'RATING' | 'TEXT' | 'TITLE',
    keyof CreateReviewBody
> = {
    RATING: 'rating',
    TEXT: 'text',
    TITLE: 'title',
};

export class ReviewForm extends AppComponent<ReviewFormProps, ReviewFormState> {
    handleSubmitForm = (e: App.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = Object.fromEntries(
            formData,
        ) as unknown as CreateReviewBody;

        const { isValid, ...validation } = validateReviewForm(body, this.props);

        if (!isValid) {
            this.setState((prev) => ({ ...prev, ...validation }));

            return false;
        }

        if (!this.props.profile) {
            this.setState((prev) => ({
                ...prev,
                error: ReviewError.UNAUTHORIZED,
            }));

            return;
        }

        const { isEdit, contentId, reviewID } = this.props;

        let reviewPromise: Promise<void> = Promise.resolve(undefined);

        this.setState((prev) => ({ ...prev, isLoading: true }));

        if (isDefined(contentId) && !isEdit) {
            reviewPromise = reviewService.createReview({
                ...body,
                rating: +body.rating,
                contentID: contentId,
            });
        }

        if (isDefined(reviewID) && isEdit) {
            reviewPromise = reviewService.updateReview({
                ...body,
                rating: +body.rating,
                reviewID,
            });
        }

        reviewPromise
            .then(() => {
                this.setState((prev) => ({ ...prev, isSuccess: true }));

                this.props.onSubmit?.();
            })
            .catch((error) => {
                this.setState((prev) => ({
                    ...prev,
                    isSuccess: false,
                    error: error instanceof Error ? error.message : '',
                }));
            })
            .finally(() => {
                // setTimeout(() => {
                this.setState((prev) => ({
                    ...prev,
                    isLoading: false,
                }));
                // }, 100);
            });
    };

    handleInputTitle = (e: App.FormEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;
        const titleError = getReviewFormTitleError(title);

        this.setState((prev) => ({ ...prev, titleError }));

        if (this.state.error) {
            this.setState((prev) => ({ ...prev, error: '' }));
        }
    };

    handleChangeTitle = (e: App.ChangeEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;
        const titleError = getReviewFormTitleError(title);

        this.setState((prev) => ({ ...prev, titleError }));
    };

    handleInputText = (e: App.FormEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value;
        const textError = getReviewFormTextError(text);

        this.setState((prev) => ({ ...prev, textError }));
    };

    handleChangeText = (e: App.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value;
        const textError = getReviewFormTextError(text);

        this.setState((prev) => ({ ...prev, textError }));

        if (this.state.error) {
            this.setState((prev) => ({ ...prev, error: '' }));
        }
    };

    handleRatingChange = (e: App.ChangeEvent<HTMLInputElement>) => {
        const ratingError = e.currentTarget.value
            ? ''
            : ReviewFormError.RATING_EMPTY_VALUE;

        this.setState((prev) => ({ ...prev, ratingError }));

        if (this.state.error) {
            this.setState((prev) => ({ ...prev, error: '' }));
        }
    };

    render() {
        const { rating, title, text, isEdit } = this.props;
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
                        imageSrc={this.props.profile?.avatar}
                        className={cx('avatar')}
                        width="64px"
                        height="64px"
                    />
                    <RadioRating
                        id={REVIEW_FORM_VALUES.RATING}
                        name={REVIEW_FORM_VALUES.RATING}
                        hasError={!!ratingError}
                        errorHint={ratingError}
                        onChange={this.handleRatingChange}
                        value={rating}
                    />
                </div>
                <Input
                    label="Заголовок"
                    id={REVIEW_FORM_VALUES.TITLE}
                    name={REVIEW_FORM_VALUES.TITLE}
                    hasError={!!titleError}
                    errorHint={titleError}
                    onInput={this.handleInputTitle}
                    onChange={this.handleChangeTitle}
                    placeholder="Введите заголовок"
                    value={title}
                />
                <Input
                    label="Текст"
                    id={REVIEW_FORM_VALUES.TEXT}
                    inputType="textarea"
                    name={REVIEW_FORM_VALUES.TEXT}
                    hasError={!!textError}
                    errorHint={textError}
                    onInput={this.handleInputText}
                    onChange={this.handleChangeText}
                    placeholder="Введите текст"
                    value={text}
                />
                <Button
                    type="submit"
                    isLoading={isLoading}
                    outlined
                    styleType="secondary"
                    disabled={!!error}
                >
                    {isEdit ? 'Редактировать' : 'Опубликовать'}
                    <CheckMark show={isSuccess} />
                </Button>
                {!!error && (
                    <ErrorMessage message={error} style="text-align: left" />
                )}
            </form>
        );
    }
}
