import { Component } from '../Component.js';

/**
 *
 * @param {any} value Значение для проверки
 * @returns {boolean} Флаг, показывающий,
 * является ли значение типа `Node`, `Component`, `string` или `number`
 */
export const isChild = (value) =>
    value instanceof Node ||
    value instanceof Component ||
    typeof value === 'string' ||
    typeof value === 'number';
