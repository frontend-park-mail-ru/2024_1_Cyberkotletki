import { Header } from '../../components/Header/Header.js';
import { Core } from '../../core/Core.js';

export const LoginPage = (props) =>
    Core.createElement('div', {
        ...props,
        children: [
            Header({ title: 'Login Page', class: 'example' }),
            ...(props?.children ?? []),
        ],
    });
