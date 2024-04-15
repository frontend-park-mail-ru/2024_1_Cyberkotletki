import styles from './Input.module.scss';

import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles as Record<string, string | undefined>);

export interface InputProps
    extends Omit<
        App.DetailedHTMLProps<
            App.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        'ref'
    > {
    label?: string;
    hasError?: boolean;
    errorHint?: string;
    containerClassName?: string;
}

export class Input extends AppComponent<InputProps> {
    render() {
        const {
            label,
            hasError,
            errorHint,
            className,
            containerClassName,
            ...props
        } = this.props;

        return (
            <div className={cx('container', containerClassName)}>
                {!!label && (
                    <label className={cx('label')} htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <input
                    {...props}
                    className={cx('input', className, {
                        'with-error': hasError,
                    })}
                />
                {hasError && !!errorHint && (
                    <div className={cx('error-hint')}>{errorHint}</div>
                )}
            </div>
        );
    }
}
