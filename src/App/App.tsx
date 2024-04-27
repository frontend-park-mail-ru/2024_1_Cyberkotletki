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
import { ProfileSettingsPage } from '@/pages/ProfileSettingsPage';
import { ProfileProvider } from '@/Providers/ProfileProvider';
import { ContentProvider } from '@/Providers/ContentProvider';
import { QuestionnairePage } from '@/pages/QuestionnairePage';
import { LayoutQuestionnaire } from '@/layouts/LayoutQuestionnaire';
import { QuestionnaireCreatePage } from '@/pages/QuestionnaireCreatePage';

import '@/styles/global.scss';

export class App extends AppComponent<object> {
    render() {
        return (
            <ContentProvider>
                <ProfileProvider>
                    <HistoryProvider
                        router={[
                            {
                                path: routes.root(),
                                element: (
                                    <LayoutQuestionnaire>
                                        <IndexPage />
                                    </LayoutQuestionnaire>
                                ),
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
                                element: (
                                    <LayoutQuestionnaire>
                                        <CollectionsPage />
                                    </LayoutQuestionnaire>
                                ),
                            },
                            {
                                path: routes.profile(),
                                element: (
                                    <LayoutQuestionnaire>
                                        <ProfilePage />
                                    </LayoutQuestionnaire>
                                ),
                            },
                            {
                                path: routes.profileSettings(),
                                element: (
                                    <LayoutQuestionnaire>
                                        <ProfileSettingsPage />
                                    </LayoutQuestionnaire>
                                ),
                            },
                            {
                                path: routes.film(':uid'),
                                element: (
                                    <LayoutQuestionnaire>
                                        <FilmPage />
                                    </LayoutQuestionnaire>
                                ),
                            },
                            {
                                path: routes.person(':uid'),
                                element: (
                                    <LayoutQuestionnaire>
                                        <PersonPage />
                                    </LayoutQuestionnaire>
                                ),
                            },
                            {
                                path: routes.notFound(),
                                element: <NotFound withButton />,
                            },
                            {
                                path: routes.questionnaire(),
                                element: <QuestionnairePage />,
                            },
                            {
                                path: routes.questionnaireCreate(),
                                element: <QuestionnaireCreatePage />,
                            },
                        ]}
                    />
                </ProfileProvider>
            </ContentProvider>
        );
    }
}
