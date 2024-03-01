import { AppRoutes } from '../AppRouter/AppRouter.js';
import { HistoryProvider } from '../Providers/HistoryProvider.js';
import { RootPage } from '../pages/RootPage/RootPage.js';
import { LoginPage } from '../pages/LoginPage/LoginPage.js';

export const App = () =>
    HistoryProvider({
        router: new AppRoutes([
            { path: '/', element: RootPage() },
            { path: '/login', element: LoginPage() },
        ]),
    });
