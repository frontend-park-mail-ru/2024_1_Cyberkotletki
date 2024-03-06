import { Component } from '../../../core/src/Component.js';
import { Core } from '../../../core/Core.js';
import { Input } from '../../Input/Input.js';
import { Button } from '../../Button/Button.js';

import {
    EMAIL_INPUT_PROPS,
    PASSWORD_INPUT_PROPS,
    PASSWORD_REPEAT_INPUT_PROPS,
} from './Form.contstants.js';
import styles from './Form.module.scss';
import {
    changeEmailInput,
    changePasswordInput,
    changeRepeatPasswordInput,
    getErrorMessage,
    inputEmailInput,
    inputPasswordInput,
    inputRepeatPasswordInput,
    submitForm,
} from './Form.utils.js';

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

    constructor(props) {
        super(props);

        this.Form = Core.createElement('form');
        this.EmailInput = Input();
        this.PasswordInput = Input();
        this.RepeatPasswordInput = Input();
        this.ErrorHint = Core.createElement('div');
        this.Button = Button();
    }

    hasError() {
        return (
            !!this.state.emailError ||
            !!this.state.passwordError ||
            !!this.state.passwordRepeatError
        );
    }

    render(props = {}, state = {}) {
        this.props = props;
        this.state = state;

        return this.Form.render({
            ...props,
            class: styles.form,
            onSubmit: (e) => {
                submitForm.call(this, e);
            },
            action: '#',
            children: [
                this.EmailInput.render({
                    ...EMAIL_INPUT_PROPS,
                    hasError: this.state.emailError,
                    errorHint: this.state.emailError,
                    onChange: (e) => {
                        changeEmailInput.call(this, e);
                    },
                    onInput: (e) => {
                        inputEmailInput.call(this, e);
                    },
                }),
                this.PasswordInput.render({
                    ...PASSWORD_INPUT_PROPS,
                    autocomplete: props.isLogin ? 'password' : 'new-password',
                    hasError: state.passwordError,
                    errorHint: state.passwordError,
                    onChange: (e) => {
                        changePasswordInput.call(this, e);
                    },
                    onInput: (e) => {
                        inputPasswordInput.call(this, e);
                    },
                }),
                !props.isLogin &&
                    this.RepeatPasswordInput.render({
                        ...PASSWORD_REPEAT_INPUT_PROPS,
                        hasError: state.passwordRepeatError,
                        errorHint: state.passwordRepeatError,
                        onChange: (e) => {
                            changeRepeatPasswordInput.call(this, e);
                        },
                        onInput: (e) => {
                            inputRepeatPasswordInput.call(this, e);
                        },
                    }),

                this.Button.render({
                    type: 'submit',
                    class: styles.button,
                    children: [props.isLogin ? 'Войти' : 'Продолжить'],
                    disabled: this.hasError(),
                    isLoading: state.isLoading,
                }),
                !!state.error &&
                    this.ErrorHint.render({
                        class: styles.error,
                        children: [getErrorMessage(state.error)],
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
