import { createQueryParams, isDefined } from '@/utils';

class ContentRoutes {
    CONTENT_PREFIX = '/content' as const;

    COMPILATION_PREFIX = '/compilation' as const;

    SEARCH_PREFIX = '/search' as const;

    ONGOING_PREFIX = '/ongoing' as const;

    contentPreview = () => `${this.CONTENT_PREFIX}/contentPreview` as const;

    content = (id?: string | number) =>
        `${this.CONTENT_PREFIX}${isDefined(id) ? `/${id}` : ''}` as const;

    contentPerson = (id?: string | number) =>
        `${this.CONTENT_PREFIX}/person${isDefined(id) ? `/${id}` : ''}` as const;

    compilationTypes = () => `${this.COMPILATION_PREFIX}/types` as const;

    compilationType = (id: number) =>
        `${this.COMPILATION_PREFIX}/type/${id}` as const;

    compilation = (id: number, page = 1) =>
        `${this.COMPILATION_PREFIX}/${id}/${page}` as const;

    search = (searchString: string) =>
        `${this.SEARCH_PREFIX}${createQueryParams({ query: searchString })}` as const;

    ongoingNearest = () => `${this.ONGOING_PREFIX}/nearest` as const;

    ongoingYears = () => `${this.ONGOING_PREFIX}/years` as const;

    ongoing = (id?: number | string, month?: number | string) =>
        `${this.ONGOING_PREFIX}${isDefined(id) ? `/${id}` : ''}${isDefined(month) ? `/${month}` : ''}` as const;
}

export const contentRoutes = new ContentRoutes();
