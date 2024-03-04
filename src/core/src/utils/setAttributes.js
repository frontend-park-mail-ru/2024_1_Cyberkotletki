/**
 *
 * @param {Node} node
 * @param {Object} props
 */
export const setAttributes = (node, { onClick, onChange, ...props }) => {
    if (node instanceof Node) {
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
        }
    }
};
