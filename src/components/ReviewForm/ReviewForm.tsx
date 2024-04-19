import styles from './ReviewForm.module.scss';
import { validateReviewForm } from './ReviewForm.utils';
import { ReviewFormError } from './ReviewForm.constants';

import { reviewService } from '@/api/review/service';
import type { Review } from '@/api/review/types';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { RadioRating } from '@/components/ReviewForm/RadioRating';
import { AppComponent } from '@/core';
import { concatClasses, isDefined } from '@/utils';
import { CheckMark } from '@/components/CheckMark';
import { ResponseError } from '@/api/appFetch';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ProfileContext } from '@/Providers/ProfileProvider';
import type { AppContext } from '@/types/Context.types';
import {validateReviewText, validateReviewTitle} from "@/validators/validators";

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
    contentId?: number;
    context?: AppContext;
}

export const REVIEW_FORM_VALUES: Record<
    'RATING' | 'TEXT' | 'TITLE',
    keyof Review
> = {
    RATING: 'rating',
    TEXT: 'text',
    TITLE: 'title',
};

export class ReviewFormClass extends AppComponent<
    ReviewFormProps,
    ReviewFormState
> {
    handleSubmitForm = (e: App.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = Object.fromEntries(formData) as unknown as Review;

        const { isValid, ...validation } = validateReviewForm(body);

        /*if (!isValid) {
            this.setState((prev) => ({ ...prev, ...validation }));

            return false;
        }*/
        if (!isValid) {
            const stringValidation = {
                ratingError: validation.ratingError?.reasonType,
                textError: validation.textError?.reasonType,
                titleError: validation.titleError?.reasonType,
            };
            this.setState((prev) => ({ ...prev, ...stringValidation }));

            return false;
        }

        this.setState((prev) => ({ ...prev, isLoading: true }));

        if (isDefined(this.props.contentId)) {
            reviewService
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
        const title = e.currentTarget.value;
        const titleValidation = validateReviewTitle(title);
        const titleError = titleValidation.isValid ? '' : ReviewFormError[titleValidation.reasonType];

        this.setState((prev) => ({ ...prev, titleError }));
    };

    handleChangeTitle = (e: App.ChangeEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;
        const titleValidation = validateReviewTitle(title);
        const titleError = titleValidation.isValid ? '' : ReviewFormError[titleValidation.reasonType];

        this.setState((prev) => ({ ...prev, titleError }));
    };

    handleInputText = (e: App.FormEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value;
        const textValidation = validateReviewText(text);
        const textError = textValidation.isValid ? '' : ReviewFormError[textValidation.reasonType];

        this.setState((prev) => ({ ...prev, textError }));
    };

    handleChangeText = (e: App.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value;
        const textValidation = validateReviewText(text);
        const textError = textValidation.isValid ? '' : ReviewFormError[textValidation.reasonType];

        this.setState((prev) => ({ ...prev, textError }));
    };

    handleRatingChange = (e: App.ChangeEvent<HTMLInputElement>) => {
        const ratingError = e.currentTarget.value
            ? ''
            : ReviewFormError.RATING_EMPTY_VALUE;

        this.setState((prev) => ({ ...prev, ratingError }));
    };

    render() {
        const { context } = this.props;
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
                        imageSrc={context?.profile?.profile?.avatar}
                        className={cx('avatar')}
                        width="64px"
                        height="64px"
                    />
                    <RadioRating
                        name={REVIEW_FORM_VALUES.RATING}
                        required
                        hasError={!!ratingError}
                        errorHint={ratingError}
                        onChange={this.handleRatingChange}
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
                {!!error && (
                    <ErrorMessage message={error} style="text-align: left" />
                )}
            </form>
        );
    }
}

export const ReviewForm = ProfileContext.Connect(ReviewFormClass);
