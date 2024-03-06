import { LoginForm } from '../../components/LoginForm/LoginForm.js';
import { LoginLayout } from '../../layouts/LoginLayout/LoginLayout.js';

export const LoginPage = () =>
    LoginLayout({ children: [LoginForm({ isLogin: true })] });
