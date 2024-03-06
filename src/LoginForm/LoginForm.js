import { Component } from '../core/src/Component.js';
import { Core } from '../core/Core.js';
import { Input } from '../components/Input/Input.js';
import { IcUser } from '../assets/icons/IcUser.js';
import { Button } from '../components/Button/Button.js';

import styles from './LoginForm.module.scss';
import { FormFooter } from './FormFooter/FormFooter.js';

class LoginFormInner extends Component {
    render(props = {}) {
        return Core.createElement('section', {
            class: styles.section,
            children: [
                IcUser({ class: styles['user-icon'] }),
                Core.createElement(
                    'h1',
                    props.isLogin ? 'Авторизация' : 'Регистрация',
                ),
                Core.createElement('form', {
                    class: styles.form,
                    onSubmit: (e) => {
                        e.preventDefault();

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
                        }),
                        Input({
                            label: 'Пароль',
                            id: 'password',
                            name: 'password',
                            type: 'password',
                            autocomplete: props.isLogin
                                ? 'password'
                                : 'new-password',
                            inputmode: 'text',
                            placeholder: 'Введите пароль...',
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
                            }),
                        Button({
                            type: 'submit',
                            class: styles.button,
                            children: [props.isLogin ? 'Войти' : 'Продолжить'],
                            // onClick: (e) => {
                            // console.log(e);
                            // },
                        }),
                    ],
                }),
                FormFooter({ isLogin: props.isLogin }),
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
export const LoginForm = (props) => new LoginFormInner(props);
