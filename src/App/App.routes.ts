class Routes {
    root = () => '/' as const;

    login = () => '/login' as const;

    register = () => '/register' as const;

    collections = () => '/collections' as const;

    profile = () => '/profile' as const;

    profileSettings = () => '/profile/settings' as const;

    film = (id: number | string) => `/film/${id}` as const;

    notFound = () => `/not-found` as const;

    person = (id: string) => `/person/${id}` as const;

    questionnaire = () => `/questionnaire` as const;

    questionnaireCreate = () => `/questionnaire/create` as const;
}

export const routes = new Routes();

export type RoutesValues = ReturnType<Routes[keyof typeof routes]>;
