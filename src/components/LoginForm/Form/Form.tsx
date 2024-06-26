import styles from './Form.module.scss';
import {
    EMAIL_INPUT_PROPS,
    PASSWORD_INPUT_PROPS,
    PASSWORD_REPEAT_INPUT_PROPS,
} from './Form.constants';
import {
    changeEmailInput,
    changePasswordInput,
    changeRepeatPasswordInput,
    inputEmailInput,
    inputPasswordInput,
    inputRepeatPasswordInput,
    submitForm,
} from './Form.utils';

import { AppComponent } from '@/core';
import { Input } from '@/components/Input';
import { concatClasses } from '@/utils';
import { Button } from '@/components/Button';
import type { AppContext } from '@/types/Context.types';
import { HistoryContext } from '@/Providers/HistoryProvider';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ProfileContext } from '@/Providers/ProfileProvider';
import { PasswordInput } from '@/components/PasswordInput';

const cx = concatClasses.bind(styles);

export interface FormProps
    extends Omit<
        App.DetailedHTMLProps<
            App.FormHTMLAttributes<HTMLFormElement>,
            HTMLFormElement
        >,
        'ref' | 'children'
    > {
    isLogin?: boolean;
    context?: AppContext;
}

export interface FormState {
    emailError: string;
    passwordError: string;
    passwordRepeatError: string;
    emailValue: string;
    passwordValue: string;
    passwordRepeatValue: string;
    isLoading: boolean;
    error: string;
    handleChangeEmailInput: (e: App.ChangeEvent<HTMLInputElement>) => void;
    handleInputEmailInput: (e: App.FormEvent<HTMLInputElement>) => void;
    handleChangePasswordInput: (e: App.ChangeEvent<HTMLInputElement>) => void;
    handleInputPasswordInput: (e: App.FormEvent<HTMLInputElement>) => void;
    handleChangeRepeatPasswordInput: (
        e: App.ChangeEvent<HTMLInputElement>,
    ) => void;
    handleInputRepeatPasswordInput: (
        e: App.FormEvent<HTMLInputElement>,
    ) => void;
}

export class FormClass extends AppComponent<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        this.state.handleChangeEmailInput = (e) => {
            changeEmailInput.call(this, e);
        };
        this.state.handleInputEmailInput = (e) => {
            inputEmailInput.call(this, e);
        };
        this.state.handleChangePasswordInput = (e) => {
            changePasswordInput.call(this, e);
        };
        this.state.handleInputPasswordInput = (e) => {
            inputPasswordInput.call(this, e);
        };
        this.state.handleChangeRepeatPasswordInput = (e) => {
            changeRepeatPasswordInput.call(this, e);
        };
        this.state.handleInputRepeatPasswordInput = (e) => {
            inputRepeatPasswordInput.call(this, e);
        };
    }

    render() {
        // ? context не должен попасть в атрибуты
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { className, isLogin, context, ...props } = this.props;
        const {
            isLoading,
            error,
            emailError,
            passwordError,
            passwordRepeatError,
        } = this.state;

        return (
            <form
                {...props}
                className={cx('form', className)}
                onSubmit={(e) => {
                    submitForm.call(this, e);
                }}
                action="#"
            >
                <Input
                    {...EMAIL_INPUT_PROPS}
                    inputType="input"
                    hasError={!!emailError}
                    errorHint={emailError}
                    onChange={this.state.handleChangeEmailInput}
                    onInput={this.state.handleInputEmailInput}
                />
                <PasswordInput
                    {...PASSWORD_INPUT_PROPS}
                    hasError={!!passwordError}
                    errorHint={passwordError}
                    autoComplete={isLogin ? 'password' : 'new-password'}
                    onChange={this.state.handleChangePasswordInput}
                    onInput={this.state.handleInputPasswordInput}
                    withPasswordComplexity={!isLogin}
                />
                {!isLogin && (
                    <PasswordInput
                        {...PASSWORD_REPEAT_INPUT_PROPS}
                        hasError={!!passwordRepeatError}
                        errorHint={passwordRepeatError}
                        onChange={this.state.handleChangeRepeatPasswordInput}
                        onInput={this.state.handleInputRepeatPasswordInput}
                    />
                )}
                <Button
                    className={cx('button')}
                    isLoading={isLoading}
                    disabled={!!error}
                    type="submit"
                    aria-label={isLogin ? 'Войти' : 'Продолжить'}
                >
                    {isLogin ? 'Войти' : 'Продолжить'}
                </Button>
                {!!error && <ErrorMessage message={error} />}
            </form>
        );
    }
}

export const Form = ProfileContext.Connect(HistoryContext.Connect(FormClass));
