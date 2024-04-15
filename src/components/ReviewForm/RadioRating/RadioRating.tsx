import styles from './RadioRating.module.scss';

import { ErrorMessage } from '@/components/ErrorMessage';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

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
    handleChange = (e: App.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            this.setState((prev) => ({
                ...prev,
                activeValue: +e.target.value,
            }));
        }

        this.props.onChange?.(e);
    };

    render(): AppNode {
        const { hasError, errorHint, className, ...props } = this.props;

        return (
            <div className={cx('container-box', className)}>
                <div className={cx('container', { error: hasError })}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <label className={cx('value')}>
                            <input
                                {...props}
                                type="radio"
                                value={index + 1}
                                onChange={this.handleChange}
                                checked={this.state.activeValue === index + 1}
                            />
                            {index + 1}
                        </label>
                    ))}
                </div>
                {hasError && !!errorHint && (
                    <ErrorMessage message={errorHint} hint />
                )}
            </div>
        );
    }
}
