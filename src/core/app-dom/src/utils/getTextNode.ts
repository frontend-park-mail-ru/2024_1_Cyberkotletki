import { isDefined } from '@/utils';

/**
 * Поиск текстового элемента по строке или числу
 * @param $parent Родительский элемент
 * @param text Значение
 * @returns Текстовый элемент или `null`
 */
export const getTextNode = (
    $parent?: HTMLElement | null,
    text?: string | number,
) =>
    isDefined(text)
        ? [...($parent?.childNodes ?? [])].find(
              (child) => (child as Text)?.data === `${text}`,
          ) ?? null
        : null;
