import { Config, Credentials, Method } from '@/shared/constants';

interface RequestParams<T> {
    url: string;
    method: string;
    useCookies?: boolean;
    timeout?: number;
    headers?: Record<string, string>;
    queryParams?: Record<string, string>;
    body?: T;
}

const defaultOptions = {
    timeout: 5000,
};

export const NetworkError = {
    TIMEOUT: 'Сервер не отвечает. Попробуйте позже',
    CONNECTION_ERROR:
        'Отсутствует подключение к интернету. Проверьте ваше подключение и попробуйте снова',
} as const;

const MethodsSupportJSON = ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

export class ResponseError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'ResponseError';
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
}

const createInstance = (baseURL: string) => {
    const request = async <Body, T>(
        url: string,
        options: RequestParams<Body>,
    ) => {
        const params = new URLSearchParams();

        let endpointURL = baseURL + url;

        if (options.queryParams) {
            for (const [key, value] of Object.entries(options.queryParams)) {
                params.append(key, encodeURIComponent(value));
            }
            endpointURL += `?${params.toString()}`;
        }

        if (options.body && MethodsSupportJSON.includes(options.method)) {
            options.headers = {
                ...options.headers,
                'Content-Type': 'application/json',
            };
        }

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), options.timeout);

        return fetch(endpointURL, {
            method: options.method,
            headers: options.headers,
            body:
                MethodsSupportJSON.includes(options.method) && options.body
                    ? JSON.stringify(options.body)
                    : null,
            credentials:
                options.useCookies !== undefined && options.useCookies
                    ? Credentials.INCLUDE
                    : Credentials.SAME_ORIGIN,
            signal: controller.signal,
        })
            .catch((error: Error) => {
                // сетевые ошибки отлавливаем здесь и выбрасываем свою ошибку
                if (error.name === 'AbortError') {
                    throw new Error(NetworkError.TIMEOUT);
                }
                throw new Error(NetworkError.CONNECTION_ERROR);
            })
            .then((response) => {
                if (!response.ok) {
                    throw new ResponseError(response.status.toString());
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
            request<void, ResponseT>(url, {
                ...defaultOptions,
                queryParams,
                useCookies,
                url,
                method: Method.GET,
            }),

        post: <Body, ResponseT>(
            url: string,
            body?: Body,
            queryParams?: Record<string, string>,
            useCookies = true,
        ) =>
            request<Body, ResponseT>(url, {
                ...defaultOptions,
                queryParams,
                useCookies,
                body,
                url,
                method: Method.POST,
            }),

        put: <Body, ResponseT>(
            url: string,
            body?: Body,
            queryParams?: Record<string, string>,
            useCookies = true,
        ) =>
            request<Body, ResponseT>(url, {
                ...defaultOptions,
                queryParams,
                useCookies,
                body,
                url,
                method: Method.PUT,
            }),

        patch: <Body, ResponseT>(
            url: string,
            body?: Body,
            queryParams?: Record<string, string>,
            useCookies = true,
        ) =>
            request<Body, ResponseT>(url, {
                ...defaultOptions,
                queryParams,
                useCookies,
                body,
                url,
                method: Method.PATCH,
            }),

        delete: <Body, ResponseT>(
            url: string,
            body?: Body,
            queryParams?: Record<string, string>,
            useCookies = true,
        ) =>
            request<Body, ResponseT>(url, {
                ...defaultOptions,
                queryParams,
                useCookies,
                body,
                url,
                method: Method.DELETE,
            }),
    };
};

const appFetch = createInstance(`${Config.BACKEND_URL}`);
export { appFetch };
