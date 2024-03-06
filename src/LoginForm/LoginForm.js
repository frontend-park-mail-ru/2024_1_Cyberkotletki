import { Component } from '../core/src/Component.js';
import { Core } from '../core/Core.js';
import { IcUser } from '../assets/icons/IcUser.js';

import styles from './LoginForm.module.scss';
import { FormFooter } from './FormFooter/FormFooter.js';
import { Form } from './Form/Form.js';

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
                Form({ isLogin: props.isLogin }),
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
