import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';
import { IcUser } from '../../assets/icons/IcUser.js';
import { concatClasses } from '../../utils/concatClasses.js';
import { AuthContext } from '../../Providers/AuthProvider.js';
import { HistoryContext } from '../../Providers/HistoryProvider.js';

import { FormFooter } from './FormFooter/FormFooter.js';
import { Form } from './Form/Form.js';
import styles from './LoginForm.module.scss';

const cx = concatClasses.bind(styles);

class LoginFormInner extends Component {
    constructor(props) {
        super(props);

        this.Form = Form();
        this.icon = IcUser();
        this.h1 = document.createElement('h1');
        this.formFooter = FormFooter();
    }

    render(props = {}) {
        this.h1.innerText = props.isLogin ? 'Авторизация' : 'Регистрация';

        return Core.createElement('section', {
            class: cx('section', { register: !props.isLogin }),
            children: [
                this.icon.render({ class: styles['user-icon'] }),
                this.h1,
                this.Form.render({
                    isLogin: props.isLogin,
                    context: props.context,
                }),
                FormFooter({
                    isLogin: props.isLogin,
                    class: styles.footer,
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

export const LoginForm = AuthContext.Connect(
    HistoryContext.Connect((props) => new LoginFormInner(props)),
);
