import { routes } from '@/App/App.routes';
import { HistoryProvider } from '@/Providers/HistoryProvider';
import { NotFound } from '@/components/NotFound';
import { AppComponent } from '@/core';
import { CollectionsPage } from '@/pages/CollectionsPage';
import { FilmPage } from '@/pages/FilmPage';
import { PersonPage } from '@/pages/PersonPage';
import { IndexPage } from '@/pages/IndexPage';
import { LoginPage } from '@/pages/LoginPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { StoreProvider } from '@/Providers/AuthProvider';
import { ProfileSettingsPage } from '@/pages/ProfileSettingsPage';
import { ProfileProvider } from '@/Providers/ProfileProvider';

import '@/styles/global.scss';

export class App extends AppComponent<object> {
    render() {
        return (
            <StoreProvider>
                <ProfileProvider>
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
                            {
                                path: routes.collections(),
                                element: <CollectionsPage />,
                            },
                            {
                                path: routes.profile(),
                                element: <ProfilePage />,
                            },
                            {
                                path: routes.profileSettings(),
                                element: <ProfileSettingsPage />,
                            },
                            {
                                path: routes.film(':uid'),
                                element: <FilmPage />,
                            },
                            {
                                path: routes.person(':uid'),
                                element: <PersonPage />,
                            },
                            {
                                path: routes.notFound(),
                                element: <NotFound withButton />,
                            },
                        ]}
                    />
                </ProfileProvider>
            </StoreProvider>
        );
    }
}
