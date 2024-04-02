import type { AppNode } from '@/appCore/shared/AppNode.types';
import { isPrimitive } from '@/utils';

/**
 * Поиск родительского DOM элемента по цепочке owner'ов
 * @param element Элемент, к которого ищется родитель
 * @returns Родительский DOM элемент или `null`
 */
export const getParentNodeFromElement = (element: AppNode) => {
    if (isPrimitive(element)) {
        return null;
    }

    let currOwner: JSX.Element | null = element;

    while (currOwner) {
        if (!isPrimitive(currOwner)) {
            if (currOwner.ref) {
                return currOwner.ref as HTMLElement;
            }

            currOwner = currOwner.owner;
        }
    }

    return null;
};
