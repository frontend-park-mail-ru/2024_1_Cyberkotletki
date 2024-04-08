import { routes } from '@/App/App.routes';
import { AuthProvider } from '@/Providers/AuthProvider';
import { HistoryProvider } from '@/Providers/HistoryProvider';
import { AppComponent } from '@/core';
import { IndexPage } from '@/pages/IndexPage';
import { LoginPage } from '@/pages/LoginPage';

import '@/styles/global.scss';

export class App extends AppComponent<object> {
    render() {
        return (
            <AuthProvider>
                <HistoryProvider
                    router={[
                        {
                            path: routes.root(),
                            element: <IndexPage />,
                        },
                        {
                            path: routes.login(),
                            element: <LoginPage />,
                        },
                        {
                            path: routes.register(),
                            element: <LoginPage isRegister />,
                        },
                    ]}
                />
            </AuthProvider>
        );
    }
}
