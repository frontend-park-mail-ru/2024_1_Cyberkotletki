class ContentRoutes {
    contentPreview = (): string => '/content/contentPreview' as const;
}

export const contentRoutes = new ContentRoutes();
