class NewsRoutes {
    news = (): string => '/news' as const;
}

export const newsRoutes = new NewsRoutes();
