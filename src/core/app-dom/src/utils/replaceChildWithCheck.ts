/**
 * Заменяет один элемент на другой с проверкой
 * @param $oldElement Элемент, который заменяется
 * @param $newElement Элемент, которым заменяется
 */
export const replaceChildWithCheck = (
    $oldElement?: HTMLElement | Text | ChildNode | null,
    $newElement?: Node | null,
) => {
    if ($newElement) {
        $oldElement?.replaceWith($newElement);
    }
};
