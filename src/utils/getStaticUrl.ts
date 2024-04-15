import { Config } from '@/shared/constants';

/**
 * Создает полный путь до статики
 * @param path путь внутри статики
 * @param staticUrl url статики
 * @returns Возвращает полную ссылку на статику
 * @example
 * ```ts
 *  getStaticUrl('/posters/435.jpg') === "http://localhost:8080/static/posters/435.jpg"
 * ```
 */
export const getStaticUrl = (
    path?: string,
    staticUrl = Config.BACKEND_STATIC_URL,
) => (path ? `${staticUrl}/${path}` : '');
