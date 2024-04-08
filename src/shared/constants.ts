export const Method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS',
} as const;

export const Credentials = {
    INCLUDE: 'include',
    SAME_ORIGIN: 'same-origin',
} as const;

export const LocalStorageKey = {
    IS_LOGGED_IN: 'isLoggedIn',
} as const;

export const Config = {
    BACKEND_URL: `http://${process.env.BACKEND_HOST ?? 'localhost'}:${process.env.BACKEND_PORT || 3000}`,
} as const;

export const ResponseStatus = {
    OK: '200',
    BAD_REQUEST: '400',
    UNAUTHORIZED: '401',
    FORBIDDEN: '403',
    NOT_FOUND: '404',
    CONFLICT: '409',
    INTERNAL_SERVER_ERROR: '500',
} as const;
