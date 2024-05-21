import { LoginLayout } from '@/layouts/LoginLayout';
import { LoginForm } from '@/components/LoginForm/LoginForm';
import { AppComponent } from '@/core';
import { ProfileContext } from '@/Providers/ProfileProvider';
import type { AppContextComponentProps } from '@/types/Context.types';
import { HistoryContext } from '@/Providers/HistoryProvider';
import { routes } from '@/App/App.routes';
import type { AppNode } from '@/core/shared/AppNode.types';

export interface LoginPageProps extends AppContextComponentProps {
    isRegister?: boolean;
}

class LoginPageInner extends AppComponent<LoginPageProps> {
    loadProfile = () => {
        const { context } = this.props;

        void context?.profile?.getProfilePromise?.then((profile) => {
            if (profile) {
                context.history?.changeRoute(routes.root(), undefined, true);
            }
        });
    };

    componentDidMount() {
        this.loadProfile();
    }

    render() {
        return <LoginForm isLogin={!this.props?.isRegister} />;
    }
}

export class LoginPageClass extends AppComponent<LoginPageProps> {
    render(): AppNode {
        return (
            <LoginLayout>
                <LoginPageInner {...this.props} />
            </LoginLayout>
        );
    }
}

export const LoginPage = HistoryContext.Connect(
    ProfileContext.Connect(LoginPageClass),
);
