import { routes } from '@/App/App.routes';
import { HistoryProvider } from '@/Providers/HistoryProvider';
import { AppComponent } from '@/appCore/src/AppComponent';
import { LoginPage } from '@/pages/LoginPage';

import '@/styles/global.scss';

export class App extends AppComponent<object> {
    render() {
        return (
            <HistoryProvider
                router={[
                    { path: routes.root(), element: <div>Root</div> },
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
        );
    }
}
