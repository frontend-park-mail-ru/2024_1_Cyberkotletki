import { Config, Method } from '@/shared/constants';

interface RequestParams<T extends object> {
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

const MethodsSupportJSON = ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

export const ResponseStatus = {
    OK: 200 as const,
    BAD_REQUEST: 400 as const,
    UNAUTHORIZED: 401 as const,
    FORBIDDEN: 403 as const,
    NOT_FOUND: 404 as const,
    CONFLICT: 409 as const,
    INTERNAL: 500 as const,
};

const createInstance = (baseURL: string) => {
    const request = async <Body extends object, T>(
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
                    ? 'include'
                    : 'same-origin',
            signal: controller.signal,
        })
            .then((response) => {
                const contentType = response.headers.get('content-type');

                return {
                    status: response.status,
                    data:
                        contentType && contentType.includes('application/json')
                            ? (response.json() as Promise<T>)
                            : (response.text() as Promise<T>),
                };
            })
            .finally(() => clearTimeout(id));
    };

    return {
        get: <Response>(
            url: string,
            queryParams?: Record<string, string>,
            useCookies = true,
        ): Promise<{ status: number; data: Promise<Response> }> =>
            request(url, {
                ...defaultOptions,
                queryParams,
                useCookies,
                url,
                method: Method.GET,
            }),

        post: <Body extends object, Response>(
            url: string,
            jsonData?: Body,
            queryParams?: Record<string, string>,
            useCookies = true,
        ): Promise<{ status: number; data: Promise<Response> }> =>
            request(url, {
                ...defaultOptions,
                queryParams,
                useCookies,
                body: jsonData,
                url,
                method: Method.POST,
            }),
    };
};

const appFetch = createInstance(`${Config.BACKEND_URL}`);
export default appFetch;
