import { LoginLayout } from '@/layouts/LoginLayout';
import { LoginForm } from '@/components/LoginForm/LoginForm';
import { AppComponent } from '@/core';
import type { AppContext } from '@/types/Context.types';
import { routes } from '@/App/App.routes';
import { isDefined } from '@/utils';

export interface LoginPageProps {
    isRegister?: boolean;
    context?: AppContext;
}

class LoginPageClass extends AppComponent<LoginPageProps> {
    loadProfile = () => {
        const { context } = this.props;

        if (context?.profile?.isLoggedIn === true) {
            context.history?.changeRoute(routes.root(), undefined, true);

            return;
        }

        if (!isDefined(context?.profile?.isLoggedIn)) {
            void context?.profile?.getProfile().then((profile) => {
                if (profile) {
                    context.history?.changeRoute(
                        routes.root(),
                        undefined,
                        true,
                    );
                }
            });
        }
    };

    render() {
        this.loadProfile();

        return (
            <LoginLayout>
                <LoginForm isLogin={!this.props?.isRegister} />
            </LoginLayout>
        );
    }
}

export const LoginPage = LoginPageClass;
