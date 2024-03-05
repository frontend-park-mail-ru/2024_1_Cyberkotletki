/**
 *
 * @param {HTMLElement} node Узел, в который определяются атрибуты
 * @param {object} props Аттрибуты, которые добавятся к узлу
 * @param {(event:Event)=>void|undefined} props.onClick Событие клика
 * @param {(event:Event)=>void|undefined} props.onChange
 * Событие изменения значения
 */
export const setAttributes = (node, { onClick, onChange, ...props }) => {
    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (Object.keys(node).includes(key)) {
                node[key] = value;
            } else {
                node.setAttribute(key, value);
            }
        });
    }

    if (onChange) {
        node.addEventListener('change', onChange);
    }

    if (onClick) {
        node.addEventListener('click', onClick);
        node.addEventListener('click', onClick);
    }
};
