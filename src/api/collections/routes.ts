class CollectionsRoutes {
    genres = (): string => '/collections/genres' as const;

    compilation = (): string => '/collections/compilation' as const;
}

export const collectionsRoutes = new CollectionsRoutes();
