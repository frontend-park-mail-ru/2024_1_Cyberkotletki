import { Header } from '../../components/Header/Header.js';
import { createElement } from '../../core/createElement.js';

export const LoginPage = () =>
    // const div = document.createElement('div');
    // div.append(Header({ props: { title: 'Login Page' } }));

    createElement('div', {}, Header({ props: { title: 'Login Page' } }));
