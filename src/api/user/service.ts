import type {
    ChangePasswordBody,
    ChangeProfileBody,
    ProfileResponse,
    UserMeResponse,
} from './types';
import { userRoutes } from './routes';

import { ResponseError, appFetch } from '@/api/appFetch';
import { ResponseStatus } from '@/shared/constants';
import { AuthError } from '@/api/auth/constants';

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

    updateProfile = (data: ChangeProfileBody) =>
        appFetch
            .put<ChangeProfileBody, unknown>(userRoutes.profile(), data)
            .catch((error) => {
                if (error instanceof ResponseError) {
                    if (error.statusCode === ResponseStatus.BAD_REQUEST) {
                        throw new Error(AuthError.BAD_REQUEST);
                    }

                    throw error;
                }

                throw error;
            });

    updatePassword = (data: ChangePasswordBody) =>
        appFetch
            .put<ChangePasswordBody, unknown>(userRoutes.password(), data)
            .catch((error) => {
                if (error instanceof ResponseError) {
                    if (error.statusCode === ResponseStatus.BAD_REQUEST) {
                        throw new Error('Введен неверный текущий пароль');
                    }

                    throw error;
                }

                throw error;
            });

    updateAvatar = (image: File) => {
        const formData = new FormData();
        formData.append('avatar', image);

        return appFetch.put<unknown, unknown>(userRoutes.avatar(), formData);
    };
}

export const userService = new UserService();
