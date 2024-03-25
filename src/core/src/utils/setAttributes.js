import { ComponentEvent } from '../constants';

/**
 *
 * @param {HTMLElement} node Узел, в который определяются атрибуты
 * @param {object} props Аттрибуты, которые добавятся к узлу
 * @param {(event:Event)=>void|undefined} props.onClick Событие клика
 * @param {(event:Event)=>void|undefined} props.onChange Событие onChange
 * @param {(event:Event)=>void|undefined} props.onInput Событие onInput
 * Событие изменения значения
 * @param {(event:Event)=>void|undefined} props.onSubmit Событие отправки формы
 */
export const setAttributes = (node, props) => {
    if (props) {
        const eventKeys = Object.keys(ComponentEvent);

        Object.entries(props).forEach(([key, value]) => {
            if (eventKeys.includes(key)) {
                node.addEventListener(ComponentEvent[key], value);

                return;
            }

            if (value) {
                node.setAttribute(key, value);
            } else {
                node.removeAttribute(key);
            }
        });
    }
};
