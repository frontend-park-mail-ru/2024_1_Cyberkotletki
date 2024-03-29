import { AppRoutes } from '../AppRouter/AppRouter.js';
import { HistoryProvider } from '../Providers/HistoryProvider.js';
import { LoginPage } from '../pages/LoginPage/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage.js';
import { AuthProvider } from '../Providers/AuthProvider.js';
import { IndexPage } from '../pages/IndexPage/IndexPage';

import { routes } from './App.routes.js';

import '../styles/global.scss';
import { Core } from '@/core/Core.js';

export const App = (props) =>
    AuthProvider(
        HistoryProvider({
            router: new AppRoutes([
                { path: routes.root(), renderElement: IndexPage },
                { path: routes.login(), renderElement: LoginPage },
                { path: routes.register(), renderElement: RegisterPage },
                {
                    path: '/test',
                    renderElement: () =>
                        Core.createElement('div', {
                            id: 'test-page',
                        }),
                },
            ]),
            ...props,
        }),
    );
