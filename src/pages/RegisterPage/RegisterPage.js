import { LoginForm } from '../../LoginForm/LoginForm.js';
import { LoginLayout } from '../../layouts/LoginLayout/LoginLayout.js';

export const RegisterPage = () =>
    LoginLayout({ children: [LoginForm({ isLogin: false })] });
