import { getParentNodeFromElement } from '@/appCore/app-dom/src/utils/getParentNodeFromElement';

/**
 * Добавляет $element в $parent с проверкой
 * @param owner Родительский DOM элемент или JSX.Element
 * @param $element Дочерний DOM элемент
 */
export const appendChildWithCheck = (
    owner?: HTMLElement | JSX.Element | null,
    $element?: HTMLElement | Text | null,
) => {
    if (owner instanceof HTMLElement) {
        if ($element) {
            owner.appendChild($element);
        }

        return;
    }

    const $parent = getParentNodeFromElement(owner);

    if (!$parent) {
        throw new Error(`Нельзя добавить элемент к ${typeof $parent}`);
    }

    if ($element) {
        $parent.appendChild($element);
    }
};
