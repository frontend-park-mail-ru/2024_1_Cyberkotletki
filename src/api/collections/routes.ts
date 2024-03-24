class CollectionsRoutes {
    genres = (): string => '/collections/genres';

    compilation = (): string => '/collections/compilation';
}

export const collectionsRoutes = new CollectionsRoutes();
