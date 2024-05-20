import styles from './RadioRating.module.scss';

import { ErrorMessage } from '@/components/ErrorMessage';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { clickOnEnter, concatClasses } from '@/utils';
import { Icon } from '@/components/Icon';
import { icStarOutlinedUrl } from '@/assets/icons';

const cx = concatClasses.bind(styles);

export interface RadioRatingState {
    activeValue?: number;
}

export interface RadioRatingProps
    extends App.DetailedHTMLProps<
        App.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    hasError?: boolean;
    errorHint?: string;
}

export class RadioRating extends AppComponent<
    RadioRatingProps,
    RadioRatingState
> {
    state: RadioRatingState = { activeValue: +(this.props.value ?? 0) };

    handleChange = (e: App.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            this.setState((prev) => ({
                ...prev,
                activeValue: +e.target.value,
            }));
        }

        this.props.onChange?.(e);
    };

    componentDidUpdate(
        _: RadioRatingState | null,
        prevProps: RadioRatingProps | null,
    ): void {
        if (prevProps?.value !== this.props.value) {
            this.setState((prev) => ({
                ...prev,
                activeValue: +(this.props.value ?? 0),
            }));
        }
    }

    render(): AppNode {
        const { hasError, errorHint, className, id, ...props } = this.props;

        const showError = hasError && !!errorHint;

        return (
            <div className={cx('container-box', className)} id={id}>
                <div
                    className={cx('container', { error: hasError })}
                    role="radiogroup"
                >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <label
                            role="radio"
                            className={cx('value')}
                            tabIndex={0}
                            onKeyDown={clickOnEnter}
                            aria-label={`Mark ${index + 1}`}
                        >
                            <input
                                {...props}
                                type="radio"
                                value={index + 1}
                                onChange={this.handleChange}
                                checked={this.state.activeValue === index + 1}
                                tabIndex={-1}
                            />
                            <Icon
                                className={cx('icon')}
                                icon={icStarOutlinedUrl}
                            />
                        </label>
                    ))}
                </div>
                {showError && <ErrorMessage message={errorHint} hint />}
            </div>
        );
    }
}
