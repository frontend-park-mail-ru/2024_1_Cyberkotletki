import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';
import { Link } from '../../components/Link/Link.js';
import { routes } from '../../App/App.routes.js';

import styles from './FormFooter.module.scss';

class FormFooterInner extends Component {
    render(props = {}) {
        return Core.createElement('div', {
            ...props,
            children: [
                props.isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?',
                Link({
                    href: props.isLogin ? routes.register() : routes.login(),
                    class: styles.link,
                    children: [props.isLogin ? 'Зарегистрируйтесь' : 'Войти'],
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
export const FormFooter = (props) => new FormFooterInner(props);
