import { isPrimitiveType } from '../../../utils/isPrimitiveType.js';

/**
 *
 * @param {Array<HTMLElement | string | number>} prev Prev
 * @param {Array<HTMLElement | string | number>} next Nxt
 * @param {HTMLElement} node Node
 */
export const changeChildren = (prev, next, node) => {
    let prevCopy = [...(prev ?? [])];
    const nextCopy = next ?? [];

    requestAnimationFrame(() => {
        prevCopy.forEach((prevNode, index) => {
            if (!nextCopy.find((nextNode) => nextNode === prevNode)) {
                if (prevNode instanceof Node) {
                    prevNode.remove();
                }

                if (isPrimitiveType(prevNode)) {
                    const child = [...(node.childNodes ?? [])].find(
                        (child) => child?.data === `${prevNode}`,
                    );

                    child?.remove();
                }

                prevCopy[index] = undefined;
            }
        });

        prevCopy = prevCopy.filter(Boolean);

        nextCopy.forEach((nextNode, index) => {
            if (nextNode !== prevCopy[index]) {
                if (
                    typeof nextNode === 'string' ||
                    typeof nextNode === 'number'
                ) {
                    node.appendChild(document.createTextNode(`${nextNode}`));
                }

                if (nextNode instanceof Node) {
                    node.appendChild(nextNode);
                }
            }
        });
    });
};
