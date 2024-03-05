import { AppRoutes } from '../AppRouter/AppRouter.js';
import { HistoryProvider } from '../Providers/HistoryProvider.js';
import { RootPage } from '../pages/RootPage/RootPage.js';
import { LoginPage } from '../pages/LoginPage/LoginPage.js';

import { routes } from './App.routes.js';

export const App = (props) =>
    HistoryProvider({
        router: new AppRoutes([
            { path: routes.root(), renderElement: RootPage },
            { path: routes.login(), renderElement: LoginPage },
        ]),
        ...props,
    });