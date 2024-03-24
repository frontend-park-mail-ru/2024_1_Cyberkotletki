import {
    APP_NODE_EVENT_MAP,
    type AppNodeEventType,
} from '@/appCore/shared/AppNodeEvent.type';
import { isFunction } from '@/utils';

/**
 * Удаляет проуслушиватель события или выводит ошибку,
 * если проуслушиватель не функция
 * @param node Элемент, у которого ужно удалить прослушиватель события
 * @param key Кастомный тип события `onClick`, `onChange` и т.д.
 * @param listener Прослушиватель
 * @throws {TypeError}
 */
export const removeEventListenerWithCheck = (
    node: HTMLElement | null | undefined,
    key: AppNodeEventType,
    listener?: unknown,
) => {
    if (isFunction(listener)) {
        node?.removeEventListener(APP_NODE_EVENT_MAP[key], listener);
    } else {
        throw new TypeError(
            `Невозможно удалить тип "${typeof listener}" обработчика события "${key}"`,
        );
    }
};
