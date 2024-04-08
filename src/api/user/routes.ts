import { createQueryParams } from '@/utils';

class UserRoutes {
    profile = (id: string | number) =>
        `/user/profile${createQueryParams({ id })}` as const;

    me = () => '/user/me';
}

export const userRoutes = new UserRoutes();
