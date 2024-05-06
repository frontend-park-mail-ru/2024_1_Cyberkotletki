import { isDefined } from '@/utils';

class ContentRoutes {
    contentPreview = (): string => '/content/contentPreview' as const;

    content = (id?: string | number) =>
        `/content${isDefined(id) ? `/${id}` : ''}` as const;

    contentPerson = (id?: string | number) =>
        `/content/person${isDefined(id) ? `/${id}` : ''}` as const;

    compilationTypes = (): string => '/compilation/types' as const;

    compilationType = (id: number): string =>
        `/compilation/type/${id}` as const;

    compilation = (id: number, page = 1): string =>
        `/compilation/${id}/${page}` as const;
}

export const contentRoutes = new ContentRoutes();
