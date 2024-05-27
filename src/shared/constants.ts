import { routes, type RoutesValues } from '@/App/App.routes';

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

    CDN_BACKEND_URL = process.env.CDN_BACKEND_URL ?? '';

    BACKEND_STATIC_URL =
        process.env.NODE_ENV === 'production'
            ? (`${this.CDN_BACKEND_URL}/static` as const)
            : (`${this.BACKEND_URL}/static` as const);

    BACKEND_URL_API_PREFiX = process.env.BACKEND_URL_API_PREFiX ?? '';

    private backendUrlObject = new URL(
        `${this.BACKEND_URL}${this.BACKEND_URL_API_PREFiX}`,
    );

    WS_BACKEND_URL =
        `${process.env.WEBSOCKET_SCHEME ?? 'ws'}://${this.backendUrlObject.host}${this.backendUrlObject.pathname}` as const;
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
    { route: routes.collections(), title: 'Подборки' },
    { route: routes.releases(), title: 'Календарь релизов' },
] as const;

export const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
] as const;

export const GENRES_MAP: Record<string, number> = {
    драма: 33,
    комедия: 34,
    криминал: 35,
    биография: 36,
    фантастика: 37,
    боевик: 38,
    приключения: 39,
    фэнтези: 40,
    семейный: 41,
    триллер: 42,
    детектив: 43,
    мультфильм: 44,
    мелодрама: 45,
    музыка: 46,
    вестерн: 47,
    военный: 48,
    аниме: 49,
    мюзикл: 50,
    ужасы: 51,
    история: 52,
    документальный: 53,
    спорт: 54,
    детский: 55,
    короткометражка: 56,
    'фильм-нуар': 57,
    'реальное ТВ': 58,
};
