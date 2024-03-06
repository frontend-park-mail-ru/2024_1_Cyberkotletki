/**
 *
 * @param {HTMLElement} node Узел, в который определяются атрибуты
 * @param {object} props Аттрибуты, которые добавятся к узлу
 * @param {(event:Event)=>void|undefined} props.onClick Событие клика
 * @param {(event:Event)=>void|undefined} props.onChange
 * Событие изменения значения
 * @param {(event:Event)=>void|undefined} props.onSubmit Событие отправки формы
 */
export const setAttributes = (
    node,
    { onClick, onChange, onSubmit, ...props },
) => {
    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (Object.keys(node).includes(key)) {
                node[key] = value;
            } else if (value) {
                node.setAttribute(key, value);
            } else {
                node.removeAttribute(key);
            }
        });
    }

    if (onChange) {
        node.addEventListener('change', onChange);
    }

    if (onClick) {
        node.addEventListener('click', onClick);
    }

    if (onSubmit) {
        node.addEventListener('submit', onSubmit);
    }
};
