export const Method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS',
};

export const Credentials = {
    INCLUDE: 'include',
    SAME_ORIGIN: 'same-origin',
};

export const LocalStorageKey = {
    IS_LOGGED_IN: 'isLoggedIn',
};

export const Config = {
    BACKEND_URL: `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`,
};

export const RESPONSE_ERROR_CODE = {
    NOT_FOUND: '404',
    SYNTAX_ERROR: '400',
    INTERNAL_SERVER_ERROR: '500',
};
