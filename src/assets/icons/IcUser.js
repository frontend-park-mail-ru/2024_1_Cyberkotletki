import { Component } from '../../core/src/Component';
import { setAttributes } from '../../core/src/utils/setAttributes';

export class IcUserInner extends Component {
    constructor(props) {
        super(props);

        const doc = new DOMParser().parseFromString(
            `<svg id="ic-user" width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 64C16 37.4903 37.4903 16 64 16C90.5097 16 112 37.4903 112 64C112 90.5097 90.5097 112 64 112C37.4903 112 16 90.5097 16 64Z" fill="#7E869E" fill-opacity="0.25"/>
<circle cx="64" cy="53.3333" r="21.3333" fill="#F0F1F3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M101.198 109.251C101.209 109.359 101.149 109.462 101.048 109.504C95.0406 112 86.1899 112 72.0001 112H56.0001C41.8108 112 32.9603 112 26.9524 109.504C26.8521 109.462 26.7921 109.36 26.8029 109.252C28.4291 92.8651 44.4619 80 64.0004 80C83.5388 80 99.5716 92.865 101.198 109.251Z" fill="#F0F1F3"/>
</svg>`,
            'image/svg+xml',
        );

        this.element = doc.querySelector('svg#ic-user');
    }

    render(props = {}) {
        setAttributes(this.element, props);

        return this.element;
    }
}

export const IcUser = (props) => new IcUserInner(props);
