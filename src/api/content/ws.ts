import { contentRoutes } from './routes';

import { contentService } from '@/api/content/service';
import type { FilmPreview } from '@/api/content/types';
import { Config } from '@/shared/constants';
import { getStaticUrl, isDefined } from '@/utils';

/**
 * @param ev event
 */
function handleMessage(this: WebSocket, ev: MessageEvent<unknown>) {
    const data = JSON.parse(`${ev.data as string}`) as FilmPreview;

    const mainInfo = [data.title ?? '', data.genre ?? '']
        .filter(Boolean)
        .join(', ');

    const country = data.country ? `\n${data.country}` : '';
    const director = data.director ? `\nРежиссёр: ${data.director}` : '';

    void Notification.requestPermission().then((result) => {
        if (result === 'granted') {
            void navigator.serviceWorker.ready.then((registration) => {
                void registration
                    .showNotification(
                        `Вышел новый ${data.type === 'movie' ? 'фильм' : 'сериал'}!`,
                        {
                            body: `${mainInfo}${country}${director}`,
                            icon: getStaticUrl(data.poster),
                            lang: 'ru-RU',
                        },
                    )
                    .then(() => {
                        if (isDefined(data.id)) {
                            void contentService.unSubscribeRelease(data.id);
                        }
                    });
            });
        }
    });
}

const subscriptions: Record<number, WebSocket> = {};

export const webSocketNotifications = (ids: number[]) => {
    const subscriptionsIds = Object.keys(subscriptions).map(Number);

    subscriptionsIds.forEach((id) => {
        if (!ids.includes(id)) {
            subscriptions[id].close();
            delete subscriptions[id];
        }
    });

    ids.forEach((id) => {
        if (!subscriptions[+id]) {
            const ws = new WebSocket(
                `${Config.WS_BACKEND_URL}${contentRoutes.ongoingIsReleased(id)}`,
            );

            ws.onmessage = handleMessage;

            subscriptions[+id] = ws;
        }
    });
};
