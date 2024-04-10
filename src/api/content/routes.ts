import { isDefined } from '@/utils';

class ContentRoutes {
    contentPreview = (): string => '/content/contentPreview' as const;

    content = (id?: string | number) =>
        `/content${isDefined(id) ? `/${id}` : ''}` as const;
}

export const contentRoutes = new ContentRoutes();
