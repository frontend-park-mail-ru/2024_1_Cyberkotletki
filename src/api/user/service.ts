import type { ProfileResponse, UserMeResponse } from './types';
import { userRoutes } from './routes';

import { appFetch } from '@/api/appFetch';

class UserService {
    getProfile = async () => {
        const data = await appFetch.get<UserMeResponse | undefined>(
            userRoutes.me(),
        );

        const profile = await appFetch.get<ProfileResponse | undefined>(
            userRoutes.profile(data?.id ?? NaN),
        );

        return profile;
    };
}

export const userService = new UserService();
