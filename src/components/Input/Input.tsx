import styles from './Input.module.scss';

import { ErrorMessage } from '@/components/ErrorMessage';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles as Record<string, string | undefined>);

interface InputDefaultProps {
    label?: string;
    hasError?: boolean;
    errorHint?: string;
    containerClassName?: string;
    icon?: JSX.Children;
    iconPos?: 'start' | 'end';
    iconContainerClassName?: string;
    children?: AppNode;
}

export type InputTypeProps = Omit<
    App.DetailedHTMLProps<
        App.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
    'ref' | 'children'
> &
    InputDefaultProps & {
        inputType?: 'input';
        inputRef?: App.Ref<HTMLInputElement>;
    };

export type TextareaTypeProps = Omit<
    App.DetailedHTMLProps<
        App.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    >,
    'ref'
> &
    InputDefaultProps & {
        inputType: 'textarea';
        textareaRef?: App.Ref<HTMLTextAreaElement>;
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
            icon,
            iconPos,
            iconContainerClassName,
            children,
            ...props
        } = this.props;

        return (
            <div className={cx('container', containerClassName)}>
                {!!label && (
                    <label className={cx('label')} htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <div className={cx('input-container')}>
                    {icon && (
                        <i
                            className={cx(
                                'end-icon',
                                iconPos,
                                iconContainerClassName,
                            )}
                        >
                            {icon}
                        </i>
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
                            className={cx(
                                'input',
                                className,
                                {
                                    'with-error': hasError,
                                    input: true,
                                },
                                iconPos,
                            )}
                        />
                    )}
                </div>
                {hasError && !!errorHint && (
                    <ErrorMessage message={errorHint} hint />
                )}
                {children}
            </div>
        );
    }
}
