import { AppRoutes } from '../AppRouter/AppRouter.js';
import { HistoryProvider } from '../Providers/HistoryProvider.js';
import { RootPage } from '../pages/RootPage/RootPage.js';
import { LoginPage } from '../pages/LoginPage/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage.js';
import { AuthContext } from '../Providers/AuthContext.js';
import { IndexPage } from '../pages/IndexPage/IndexPage';

import { routes } from './App.routes.js';

import '../styles/global.scss';

export const App = (props) =>
    AuthContext(
        HistoryProvider({
            router: new AppRoutes([
                { path: routes.root(), renderElement: RootPage },
                { path: routes.login(), renderElement: LoginPage },
                { path: routes.register(), renderElement: RegisterPage },
                { path: routes.index(), renderElement: IndexPage },
            ]),
            ...props,
        }),
    );
