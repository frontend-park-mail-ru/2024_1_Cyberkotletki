import type { AppNode } from '@/appCore/shared/AppNode.types';

/**
 * Проверка, является ли узел текстовым
 * @param node Узел
 * @returns Да/Нет
 */
export const isTextNode = (node: AppNode): node is string | number =>
    typeof node === 'string' || typeof node === 'number';
