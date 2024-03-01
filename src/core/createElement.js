export class AppElement {
    element = null;

    constructor(tagName = 'div', props = {}, ...children) {
        const element = document.createElement(tagName);

        if (props && typeof props === 'object') {
            Object.entries(props).forEach(([key, value]) => {
                if (Object.keys(element).includes(key)) {
                    element[key] = value;
                } else {
                    element.setAttribute(key, value);
                }
            });
        }

        if (children.length) {
            requestAnimationFrame(() => {
                children.forEach((child) => {
                    if (child instanceof HTMLElement) {
                        element.appendChild(child);
                    }

                    if (typeof child === 'string') {
                        element.appendChild(document.createTextNode(child));
                    }
                });
            });
        }

        this.element = element;
    }
}

export const createElement = (tagName = '', props = {}, ...children) => {
    const element = new AppElement(tagName, props, ...children);

    return element.element;
};
