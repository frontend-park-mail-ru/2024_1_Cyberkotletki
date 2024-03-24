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
    BACKEND_URL: `${process.env.BACKEND_HOST}`,
};

export const RESPONSE_ERROR_CODE = {
    '404': '404',
    '400': '400',
    '500': '500',
};
