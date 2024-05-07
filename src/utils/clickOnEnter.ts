import { hasField } from '@/utils/hasField';

/**
 * Вызов события "click" при нажатии клавиши Enter
 * @param e Event
 */
export const clickOnEnter = (e: App.KeyboardEvent) => {
    if (e.code === 'Enter' && hasField(e.currentTarget, 'click', 'function')) {
        e.currentTarget.click();
    }
};
