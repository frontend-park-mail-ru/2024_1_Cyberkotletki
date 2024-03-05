import { AppRoutes } from '../AppRouter/AppRouter.js';
import { HistoryProvider } from '../Providers/HistoryProvider.js';
import { RootPage } from '../pages/RootPage/RootPage.js';
import { LoginPage } from '../pages/LoginPage/LoginPage.js';
import { AuthContext } from '../Providers/AuthContext.js';

import { routes } from './App.routes.js';

export const App = (props) =>
    HistoryProvider({
        router: new AppRoutes([
            { path: routes.root(), element: RootPage() },
            { path: routes.login(), element: LoginPage() },
        ]),
        children: AuthContext.Provider(
            // изначальное значение (т.е. пользователь не авторизован)
            { authStatus: false },
            ...props,
        ),
        ...props,
    });
