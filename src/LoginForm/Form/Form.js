import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';
import { Input } from '../../components/Input/Input.js';
import { Button } from '../../components/Button/Button.js';
import {
    validateEmail,
    validatePasswordLength,
    validatePasswordMatch,
} from '../../validators/validators.js';

import styles from './Form.module.scss';
import { submitLoginForm } from './Form.utils.js';

const getErrorMessage = (code) => {
    switch (code) {
        case '404':
            return 'Введен неверный email или пароль';
        case '400':
            return 'Пользователь с таким email уже существует';
        default:
            return 'Произошла неизвестная ошибка';
    }
};

class FormInner extends Component {
    state = {
        emailError: '',
        passwordError: '',
        passwordRepeatError: '',
        emailValue: '',
        passwordValue: '',
        passwordRepeatValue: '',
        isLoading: false,
        error: '',
    };

    hasError() {
        return (
            !!this.state.emailError ||
            !!this.state.passwordError ||
            !!this.state.passwordRepeatError
        );
    }

    render(props = {}, state = {}) {
        return Core.createElement('form', {
            ...props,
            class: styles.form,
            onSubmit: (e) => {
                e.preventDefault();

                this.setState((prev) => ({
                    ...prev,
                    isLoading: true,
                }));

                submitLoginForm(e.target, props.isLogin)
                    .then(() => {
                        this.setState((prev) => ({
                            ...prev,
                            isLoading: false,
                        }));
                    })
                    .catch((error) => {
                        this.setState((prev) => ({
                            ...prev,
                            error: error.message,
                            isLoading: false,
                        }));
                    });

                return false;
            },
            action: '#',
            children: [
                Input({
                    label: 'Email',
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    autocomplete: 'email',
                    inputmode: 'email',
                    placeholder: 'Введите email...',
                    hasError: state.emailError,
                    errorHint: state.emailError,
                    value: state.emailValue,
                    onChange: (e) => {
                        this.state.emailValue = e.target.value;

                        if (validateEmail(e.target.value)) {
                            if (state.emailError) {
                                this.setState((prev) => ({
                                    ...prev,
                                    emailError: '',
                                }));
                            }
                        } else if (!state.emailError) {
                            this.setState((prev) => ({
                                ...prev,
                                emailError: 'Введен неверный Email',
                            }));
                        }
                    },
                }),
                Input({
                    label: 'Пароль',
                    id: 'password',
                    name: 'password',
                    type: 'password',
                    autocomplete: props.isLogin ? 'password' : 'new-password',
                    inputmode: 'text',
                    placeholder: 'Введите пароль...',
                    hasError: state.passwordError,
                    errorHint: state.passwordError,
                    value: state.passwordValue,
                    onChange: (e) => {
                        this.state.passwordValue = e.target.value;

                        if (validatePasswordLength(e.target.value)) {
                            if (state.passwordError) {
                                this.setState((prev) => ({
                                    ...prev,
                                    passwordValue: e.target.value,
                                    passwordError: '',
                                }));
                            }
                        } else if (!state.passwordError) {
                            this.setState((prev) => ({
                                ...prev,
                                passwordValue: e.target.value,
                                passwordError: 'Введен пароль неверной длины',
                            }));
                        }
                    },
                }),
                !props.isLogin &&
                    Input({
                        label: 'Пароль повторно',
                        id: 'password-repeat',
                        name: 'passwordRepeat',
                        type: 'password',
                        autocomplete: 'new-password',
                        inputmode: 'text',
                        placeholder: 'Введите пароль повторно...',
                        hasError: state.passwordRepeatError,
                        errorHint: state.passwordRepeatError,
                        value: state.passwordRepeatValue,
                        onChange: (e) => {
                            this.state.passwordRepeatValue = e.target.value;

                            if (
                                validatePasswordMatch(
                                    e.target.value,
                                    state.passwordValue,
                                )
                            ) {
                                if (state.passwordRepeatError) {
                                    this.setState((prev) => ({
                                        ...prev,
                                        passwordRepeatValue: e.target.value,
                                        passwordRepeatError: '',
                                    }));
                                }
                            } else if (!state.passwordRepeatError) {
                                this.setState((prev) => ({
                                    ...prev,
                                    passwordRepeatValue: e.target.value,
                                    passwordRepeatError: 'Пароли не совпадают',
                                }));
                            }
                        },
                    }),
                !!state.error &&
                    Core.createElement('div', {
                        class: styles.error,
                        children: [getErrorMessage(state.error)],
                    }),
                Button({
                    type: 'submit',
                    class: styles.button,
                    children: [props.isLogin ? 'Войти' : 'Продолжить'],
                    disabled: this.hasError() || state.isLoading,
                }),
            ],
        });
    }
}

/**
 *
 * @param {object} props Пропсы
 * @param {boolean} props.isLogin Флаг варианта отображения
 * @returns {Component} Component
 */
export const Form = (props) => new FormInner(props);
