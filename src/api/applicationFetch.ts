import { Config, Method } from '@/shared/constants';

interface RequestParams {
    url: string;
    method: string;
    useCookies?: boolean;
    timeout?: number;
    headers?: Record<string, string>;
    queryParams?: Record<string, string>;
    jsonData?: Record<string, unknown>;
}

const defaultOptions = {
    timeout: 5000,
};

const MethodsSupportJSON = ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

const createInstance = (baseURL: string) => {
    const request = async (url: string, options: RequestParams) => {
        const params = new URLSearchParams();

        if (options.queryParams !== undefined) {
            for (const [key, value] of Object.entries(options.queryParams)) {
                params.append(key, value);
            }
            url = `${baseURL + url}?${params.toString()}`;
        } else {
            url = `${baseURL + url}`;
        }

        if (
            options.jsonData !== undefined &&
            MethodsSupportJSON.includes(options.method)
        ) {
            options.headers = {
                ...options.headers,
                'Content-Type': 'application/json',
            };
        }

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), options.timeout);

        const response = fetch(url, {
            method: options.method,
            headers: options.headers,
            body:
                MethodsSupportJSON.includes(options.method) && options.jsonData
                    ? JSON.stringify(options.jsonData)
                    : null,
            credentials:
                options.useCookies !== undefined && options.useCookies
                    ? 'include'
                    : 'same-origin',
            signal: controller.signal,
        });

        clearTimeout(id);

        return response;
    };

    return {
        get: (
            url: string,
            queryParams?: Record<string, string>,
            useCookies = true,
        ) =>
            request(url, {
                ...defaultOptions,
                queryParams,
                useCookies,
                url,
                method: Method.GET,
            }),

        post: (
            url: string,
            jsonData?: Record<string, unknown>,
            queryParams?: Record<string, string>,
            useCookies = true,
        ) =>
            request(url, {
                ...defaultOptions,
                queryParams,
                useCookies,
                jsonData,
                url,
                method: Method.POST,
            }),
    };
};

const appFetch = createInstance(`${Config.BACKEND_URL}/api`);
export default appFetch;
