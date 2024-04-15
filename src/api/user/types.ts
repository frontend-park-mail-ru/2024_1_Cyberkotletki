export interface UserMeResponse {
    id: number;
}

export interface ProfileResponse {
    avatar: string;
    email: string;
    name: string;
    rating: number;
}

export type ChangeProfileBody = Pick<ProfileResponse, 'email' | 'name'>;

export interface ChangePasswordBody {
    newPassword: string;
    oldPassword: string;
}
