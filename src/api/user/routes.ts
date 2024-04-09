import { createQueryParams } from '@/utils';

class UserRoutes {
    profile = (id?: string | number) =>
        `/user/profile${createQueryParams({ id })}` as const;

    me = () => '/user/me' as const;

    password = () => '/user/password' as const;
}

export const userRoutes = new UserRoutes();
