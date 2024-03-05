import { Header } from '../../components/Header/Header.js';
import { Core } from '../../core/Core.js';

import styles from './LoginPage.module.scss';

export const LoginPage = (props) =>
    Core.createElement('div', {
        ...props,
        class: styles['login-page'],
        children: [
            Header({ title: 'Login Page', class: 'example' }),
            ...(props?.children ?? []),
        ],
    });
