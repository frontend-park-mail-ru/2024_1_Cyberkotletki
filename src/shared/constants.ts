import type { RoutesValues } from '@/App/App.routes';
import { routes } from '@/App/App.routes';

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
}

export const Credentials = {
    INCLUDE: 'include',
    SAME_ORIGIN: 'same-origin',
} as const;

export enum LocalStorageKey {
    USER_DATA = 'USER_DATA',
}

class ConfigClass {
    BACKEND_URL = process.env.BACKEND_URL ?? '';

    BACKEND_STATIC_URL = `${this.BACKEND_URL}/static`;

    BACKEND_URL_API_PREFiX = process.env.BACKEND_URL_API_PREFiX ?? '';
}

export const Config = new ConfigClass();

export enum ResponseStatus {
    OK = '200',
    BAD_REQUEST = '400',
    UNAUTHORIZED = '401',
    FORBIDDEN = '403',
    NOT_FOUND = '404',
    CONFLICT = '409',
    INTERNAL_SERVER_ERROR = '500',
    SERVICE_UNAVAILABLE = '503',
    GATEWAY_TIMEOUT = '504',
}

export interface HeaderPage {
    route: RoutesValues;
    title: string;
    disabled?: boolean;
}

export const HEADER_TABS: HeaderPage[] = [
    { route: routes.root(), title: 'Главная' },
    { route: routes.collections(), title: 'Подборки' },
] as const;
