import { isDefined } from '@/utils/isDefined';

class Routes {
    root = () => '/' as const;

    login = () => '/login' as const;

    register = () => '/register' as const;

    collections = (id?: string | number) =>
        `/collections${isDefined(id) ? `/${id}` : ''}` as const;

    profile = () => '/profile' as const;

    profileSettings = () => '/profile/settings' as const;

    film = (id: number | string) => `/film/${id}` as const;

    notFound = () => `/not-found` as const;

    person = (id: number | string) => `/person/${id}` as const;

    favourites = () => `/favourites` as const;

    releases = () => `/releases` as const;
}

export const routes = new Routes();

export type RoutesValues = ReturnType<Routes[keyof typeof routes]>;
