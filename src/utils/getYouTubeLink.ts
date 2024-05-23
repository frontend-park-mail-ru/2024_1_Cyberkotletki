import { createQueryParams } from '@/utils/createQueryParams';

export const getYouTubeLink = (
    link: string,
    params?: Record<string, string | number | boolean | undefined>,
) =>
    `${link}${createQueryParams({ rel: 0, playsinline: 1, showinfo: 0, autoplay: 1, mute: 1, loop: 1, controls: 2, iv_load_policy: 3, modestbranding: 1, color: 'red', origin: window.location.origin, cc_load_policy: 0, enablejsapi: 1, ...params })}` as const;
