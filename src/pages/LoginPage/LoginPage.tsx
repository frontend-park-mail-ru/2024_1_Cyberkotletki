import { LoginLayout } from '@/layouts/LoginLayout';
import { LoginForm } from '@/components/LoginForm/LoginForm';
import { AppComponent } from '@/appCore/src/AppComponent';

export interface LoginPageProps {
    isRegister?: boolean;
}

export class LoginPage extends AppComponent<LoginPageProps> {
    render() {
        return (
            <LoginLayout>
                <LoginForm isLogin={!this.props?.isRegister} />
            </LoginLayout>
        );
    }
}
