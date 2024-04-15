const PARAMS_REGEXP = /[/][:][A-Za-z0-9_-]+[^/]+/g;

const EDGE_SLASHES_REGEXP = /^\/|\/$/g;

const splitStr = (splitters: string[], str: string) => {
    const splittedArr: string[] = [];

    const last = splitters?.reduce((acc, splitter) => {
        const splitted = acc.split(splitter);

        splittedArr.push(splitted[0]);

        const rest = acc.replace(splitted[0] + splitter, '');

        return rest;
    }, str);

    if (last) {
        splittedArr.push(last);
    }

    return splittedArr;
};

export const isRoutesMatch = (route: string, path: string) => {
    const params = route
        .match(PARAMS_REGEXP)
        ?.map((match) => match.replace('/', ''));

    if (!params?.length) {
        return { match: route === path } as const;
    }

    const splittedRoute = splitStr(params, route).filter(Boolean);

    const splittedPath = splitStr(splittedRoute, path).filter(Boolean);

    if (params?.length !== splittedPath?.length) {
        return { match: false } as const;
    }

    const paramsObj: Record<string, string> = {};

    for (let i = 0; i < (splittedPath?.length ?? 0); i++) {
        const withoutEdgeSlashes = splittedPath?.[i].replace(
            EDGE_SLASHES_REGEXP,
            '',
        );

        if (/\//g.test(withoutEdgeSlashes ?? '')) {
            return { match: false } as const;
        }

        const param = params[i].replace(/[/:]/g, '');

        paramsObj[param] = withoutEdgeSlashes;
    }

    return { match: true, params: paramsObj } as const;
};
