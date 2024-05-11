import {
    APP_NODE_EVENT_MAP,
    type AppNodeEventType,
} from '@/core/shared/AppNodeEvent.type';
import { isDefined, isFunction } from '@/utils';

/**
 * Добавляет проуслушиватель события или выводит ошибку,
 * если проуслушиватель не функция
 * @param node Элемент, куда нужно добавить прослушиватель события
 * @param key Кастомный тип события `onClick`, `onChange` и т.д.
 * @param listener Прослушиватель
 * @throws {TypeError}
 */
export const addEventListenerWithCheck = (
    node: HTMLElement | null | undefined,
    key: AppNodeEventType,
    listener?: unknown,
) => {
    if (isFunction(listener)) {
        node?.addEventListener(APP_NODE_EVENT_MAP[key], listener);
    } else if (isDefined(listener)) {
        throw new TypeError(
            `Тип "${typeof listener}" невозможно назначить в качестве обработчика события "${key}"`,
        );
    }
};
