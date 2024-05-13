import styles from './PasswordsForm.module.scss';
import { validatePasswordForm } from './PasswordsForm.utils';

import { userService } from '@/api/user/service';
import type { ChangePasswordBody } from '@/api/user/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';
import { AuthFormError } from '@/components/LoginForm/Form/Form.constants';
import {
    getPasswordError,
    getPasswordRepeatError,
} from '@/components/LoginForm/Form/Form.utils';
import { CheckMark } from '@/components/CheckMark';
import { ErrorMessage } from '@/components/ErrorMessage';

const cx = concatClasses.bind(styles);

export interface PasswordsFormState {
    isLoading?: boolean;
    oldPassError?: string;
    newPassError?: string;
    newPassRepError?: string;
    formError?: string;
    isSuccess?: boolean;
}

export const PASSWORDS_FIELDS: Record<
    'OLD_PASSWORD' | 'NEW_PASSWORD' | 'NEW_PASSWORD_REPEAT',
    keyof ChangePasswordBody | 'newPasswordRepeat'
> = {
    OLD_PASSWORD: 'oldPassword',
    NEW_PASSWORD: 'newPassword',
    NEW_PASSWORD_REPEAT: 'newPasswordRepeat',
} as const;

export type FormValues = Record<
    (typeof PASSWORDS_FIELDS)[keyof typeof PASSWORDS_FIELDS],
    string
>;

export class PasswordsForm extends AppComponent<object, PasswordsFormState> {
    newPassValue = '';

    handleFormSubmit = (e: App.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = Object.fromEntries(formData) as FormValues;

        const validation = validatePasswordForm(body);

        if (!validation.isValid) {
            this.setState((prev) => ({ ...prev, ...validation }));

            return false;
        }

        this.setState((prev) => ({ ...prev, isLoading: true }));

        void userService
            .updatePassword({
                oldPassword: body.oldPassword.trim(),
                newPassword: body.newPassword.trim(),
            })
            .then(() => {
                this.setState((prev) => ({
                    ...prev,
                    formError: '',
                    isSuccess: true,
                }));
            })
            .catch((error) => {
                if (error instanceof Error) {
                    this.setState((prev) => ({
                        ...prev,
                        formError: error.message,
                        isSuccess: false,
                    }));
                }
            })
            .finally(() => {
                this.setState((prev) => ({ ...prev, isLoading: false }));
            });

        return false;
    };

    handleChangeOldPass = (e: App.ChangeEvent<HTMLInputElement>) => {
        const oldPassError = e.currentTarget.value
            ? ''
            : AuthFormError.EMPTY_VALUE;

        if (oldPassError) {
            this.setState((prev) => ({ ...prev, oldPassError }));
        }
    };

    handleInputOldPass = (e: App.FormEvent<HTMLInputElement>) => {
        if (this.state.oldPassError) {
            const oldPassError = e.currentTarget.value
                ? ''
                : AuthFormError.EMPTY_VALUE;

            this.setState((prev) => ({ ...prev, oldPassError }));
        }
    };

    handleChangeNewPass = (e: App.ChangeEvent<HTMLInputElement>) => {
        const newPassError = getPasswordError(e.currentTarget.value);

        if (newPassError) {
            this.setState((prev) => ({
                ...prev,
                newPassError,
            }));
        }
    };

    handleInputNewPass = (e: App.FormEvent<HTMLInputElement>) => {
        this.newPassValue = e.currentTarget.value;

        if (this.state.newPassError) {
            const newPassError = getPasswordError(e.currentTarget.value);

            this.setState((prev) => ({
                ...prev,
                newPassError,
            }));
        }
    };

    handleChangeNewPassRep = (e: App.ChangeEvent<HTMLInputElement>) => {
        const newPassRepError = getPasswordRepeatError(
            e.currentTarget.value,
            this.newPassValue,
        );

        if (newPassRepError) {
            this.setState((prev) => ({ ...prev, newPassRepError }));
        }
    };

    handleInputNewPassRep = (e: App.FormEvent<HTMLInputElement>) => {
        if (this.state.newPassRepError) {
            const newPassRepError = getPasswordRepeatError(
                e.currentTarget.value,
                this.newPassValue,
            );

            this.setState((prev) => ({ ...prev, newPassRepError }));
        }
    };

    render() {
        const {
            oldPassError,
            newPassError,
            newPassRepError,
            isSuccess,
            formError,
            isLoading,
        } = this.state;

        return (
            <form className={cx('form')} onSubmit={this.handleFormSubmit}>
                <Input
                    label="Текущий пароль"
                    id={PASSWORDS_FIELDS.OLD_PASSWORD}
                    type="password"
                    placeholder="Введите текущий пароль..."
                    required
                    name={PASSWORDS_FIELDS.OLD_PASSWORD}
                    autoComplete="password"
                    hasError={!!oldPassError}
                    errorHint={oldPassError}
                    onChange={this.handleChangeOldPass}
                    onInput={this.handleInputOldPass}
                />
                <Input
                    label="Новый пароль"
                    id={PASSWORDS_FIELDS.NEW_PASSWORD}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Введите новый пароль..."
                    required
                    name={PASSWORDS_FIELDS.NEW_PASSWORD}
                    hasError={!!newPassError}
                    errorHint={newPassError}
                    onChange={this.handleChangeNewPass}
                    onInput={this.handleInputNewPass}
                />
                <Input
                    label="Новый пароль еще раз"
                    id={PASSWORDS_FIELDS.NEW_PASSWORD_REPEAT}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Повторите новый пароль..."
                    required
                    name={PASSWORDS_FIELDS.NEW_PASSWORD_REPEAT}
                    hasError={!!newPassRepError}
                    errorHint={newPassRepError}
                    onChange={this.handleChangeNewPassRep}
                    onInput={this.handleInputNewPassRep}
                />
                <Button type="submit" isLoading={isLoading}>
                    Обновить
                    <CheckMark show={isSuccess} />
                </Button>
                {!!formError && <ErrorMessage message={formError} />}
            </form>
        );
    }
}
