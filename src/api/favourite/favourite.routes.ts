import { isDefined } from '@/utils';

class FavouriteRoutes {
    favourite = (id?: string | number) =>
        `/favourite${isDefined(id) ? `/${id}` : ''}` as const;

    favouriteMy = () => '/favourite/my' as const;

    favouriteStatus = (id: string | number) =>
        `/favourite/status/${id}` as const;
}

export const favoriteRoutes = new FavouriteRoutes();
