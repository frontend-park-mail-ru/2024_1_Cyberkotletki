import {
    Config,
    Credentials,
    Method,
    ResponseStatus,
} from '@/shared/constants';
import { createQueryParams, hasField } from '@/utils';

interface RequestParams {
    method?: Method;
    useCookies?: boolean;
    timeout?: number;
    headers?: Record<string, string>;
    queryParams?: Record<string, string>;
}

const defaultOptions = {
    timeout: 60000,
    useCookies: true,
};

export const NetworkError = {
    TIMEOUT: 'Сервер не отвечает. Попробуйте позже',
    CONNECTION_ERROR:
        'Отсутствует подключение к интернету. Проверьте ваше подключение и попробуйте снова',
} as const;

export class ResponseError extends Error {
    statusCode: string;

    constructor(message?: string, statusCode?: string) {
        super(message);
        this.name = 'ResponseError';
        this.statusCode = statusCode ?? ResponseStatus.INTERNAL_SERVER_ERROR;

        Object.setPrototypeOf(this, ResponseError.prototype);
    }
}

const getBodyInit = <T>(body: T): BodyInit | null => {
    switch (true) {
        case body instanceof FormData:
        case body instanceof Blob:
        case body instanceof ArrayBuffer:
        case body instanceof URLSearchParams:
        case typeof body === 'string':
            return body;
        case body instanceof Object:
            return JSON.stringify(body);
        default:
            return null;
    }
};

const getContentType = <T>(body: T) => {
    switch (true) {
        case body instanceof FormData:
        case body instanceof Blob:
        case body instanceof ArrayBuffer:
        case body instanceof URLSearchParams:
        case typeof body === 'string':
            return undefined;
        case body instanceof Object:
            return { 'Content-Type': 'application/json;' };
        default:
            return null;
    }
};

const createInstance = (baseURL: string) => {
    let CSRFToken: string = localStorage.getItem('_csrf') as string;

    const getCookie = (name: string) => {
        const matches = document.cookie.match(
            new RegExp(
                `(?:^|; )${name.replace(
                    /([.$?*|{}()[\]\\/+^])/g,
                    '\\$1',
                )}=([^;]*)`,
            ),
        );

        return matches ? decodeURIComponent(matches[1]) : '';
    };

    const request = async <Body, T>(
        url: string,
        body?: Body,
        options?: RequestParams,
    ) => {
        const method = options?.method || Method.GET;

        const endpointURL =
            baseURL + url + createQueryParams(options?.queryParams);

        const bodyInit = getBodyInit(body);

        const contentType = getContentType(body);

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), options?.timeout);

        return fetch(endpointURL, {
            method,
            headers: {
                ...(options?.headers ?? {}),
                ...contentType,
                'X-Csrf': CSRFToken,
            },
            body: bodyInit,
            credentials:
                options?.useCookies !== undefined && options.useCookies
                    ? Credentials.INCLUDE
                    : Credentials.SAME_ORIGIN,
            signal: controller.signal,
        })
            .catch((error: Error) => {
                // сетевые ошибки отлавливаем здесь и выбрасываем свою ошибку
                if (error.name === 'AbortError') {
                    throw new ResponseError(
                        NetworkError.CONNECTION_ERROR,
                        ResponseStatus.GATEWAY_TIMEOUT,
                    );
                }

                throw new ResponseError(
                    NetworkError.CONNECTION_ERROR,
                    ResponseStatus.SERVICE_UNAVAILABLE,
                );
            })
            .then(async (response) => {
                if (!response.ok) {
                    CSRFToken = getCookie('_csrf');
                    localStorage.setItem('_csrf', CSRFToken);
                    await response.json().then((body) => {
                        if (hasField(body, 'message', 'string')) {
                            throw new ResponseError(
                                body.message,
                                response.status.toString(),
                            );
                        }
                    });

                    throw new ResponseError('', response.status.toString());
                }

                const contentType = response.headers.get('content-type');

                if (!contentType) {
                    return null as T;
                }

                if (contentType.includes('application/json')) {
                    return response.json() as T;
                }

                return response.text() as T;
            })
            .finally(() => clearTimeout(id));
    };

    return {
        // get не принимает тело по стандарту:
        // https://developer.mozilla.org/ru/docs/Web/HTTP/Methods/GET
        get: <ResponseT>(
            url: string,
            queryParams?: Record<string, string>,
            useCookies = true,
        ) =>
            request<void, ResponseT>(url, undefined, {
                ...defaultOptions,
                queryParams,
                useCookies,
                method: Method.GET,
            }),

        post: <Body, ResponseT>(
            url: string,
            body?: Body,
            params?: RequestParams,
        ) =>
            request<Body, ResponseT>(url, body, {
                ...defaultOptions,
                ...params,
                method: Method.POST,
            }),

        put: <Body, ResponseT>(
            url: string,
            body?: Body,
            params?: RequestParams,
        ) =>
            request<Body, ResponseT>(url, body, {
                ...defaultOptions,
                ...params,
                method: Method.PUT,
            }),

        patch: <Body, ResponseT>(
            url: string,
            body?: Body,
            params?: RequestParams,
        ) =>
            request<Body, ResponseT>(url, body, {
                ...defaultOptions,
                ...params,
                method: Method.PATCH,
            }),

        delete: <Body, ResponseT>(
            url: string,
            body?: Body,
            params?: RequestParams,
        ) =>
            request<Body, ResponseT>(url, body, {
                ...defaultOptions,
                ...defaultOptions,
                ...params,
                method: Method.DELETE,
            }),
    };
};

const appFetch = createInstance(
    `${Config.BACKEND_URL}${Config.BACKEND_URL_API_PREFiX}`,
);
export { appFetch };
