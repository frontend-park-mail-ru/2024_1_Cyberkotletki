import styles from './Input.module.scss';

import { ErrorMessage } from '@/components/ErrorMessage';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles as Record<string, string | undefined>);

export type InputTypeProps = Omit<
    App.DetailedHTMLProps<
        App.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
    'ref' | 'children'
> & {
    inputType?: 'input';
    inputRef?: App.Ref<HTMLInputElement>;
    label?: string;
    hasError?: boolean;
    errorHint?: string;
    containerClassName?: string;
};

export type TextareaTypeProps = Omit<
    App.DetailedHTMLProps<
        App.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    >,
    'ref' | 'children'
> & {
    inputType: 'textarea';
    textareaRef?: App.Ref<HTMLTextAreaElement>;
    label?: string;
    hasError?: boolean;
    errorHint?: string;
    containerClassName?: string;
};

export type InputProps = InputTypeProps | TextareaTypeProps;

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
                {this.props.inputType === 'textarea' ? (
                    <textarea
                        {...this.props}
                        ref={this.props.textareaRef}
                        className={cx('input', className, {
                            'with-error': hasError,
                            textarea: true,
                        })}
                    >
                        {this.props.value}
                    </textarea>
                ) : (
                    <input
                        {...this.props}
                        ref={this.props.inputRef}
                        className={cx('input', className, {
                            'with-error': hasError,
                            input: true,
                        })}
                    />
                )}

                {hasError && !!errorHint && (
                    <ErrorMessage message={errorHint} hint />
                )}
            </div>
        );
    }
}
