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

import { AppComponent } from '@/appCore/src/AppComponent';
import { Input } from '@/components/Input';
import { concatClasses } from '@/utils';
import { Button } from '@/components/Button/Button';
import type { AppContext } from '@/types/Context.types';

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

export class Form extends AppComponent<FormProps, FormState> {
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
        const { className, isLogin, ...props } = this.props ?? {};
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
                <div>
                    <Input
                        {...EMAIL_INPUT_PROPS}
                        hasError={!!emailError}
                        errorHint={emailError}
                        onChange={this.state.handleChangeEmailInput}
                        onInput={this.state.handleInputEmailInput}
                    />
                    <Input
                        {...PASSWORD_INPUT_PROPS}
                        hasError={!!passwordError}
                        errorHint={passwordError}
                        autoComplete={isLogin ? 'password' : 'new-password'}
                        onChange={this.state.handleChangePasswordInput}
                        onInput={this.state.handleInputPasswordInput}
                    />
                    {!isLogin && (
                        <Input
                            {...PASSWORD_REPEAT_INPUT_PROPS}
                            hasError={!!passwordRepeatError}
                            errorHint={passwordRepeatError}
                            onChange={
                                this.state.handleChangeRepeatPasswordInput
                            }
                            onInput={this.state.handleInputRepeatPasswordInput}
                        />
                    )}
                </div>
                <Button
                    className={cx('button')}
                    isLoading={isLoading}
                    type="submit"
                >
                    {isLogin ? 'Войти' : 'Продолжить'}
                </Button>
                {!!error && <div className={cx('error')}>{error}</div>}
            </form>
        );
    }
}
