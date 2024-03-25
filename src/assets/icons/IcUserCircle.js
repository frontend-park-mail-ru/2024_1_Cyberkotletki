import { Component } from '../../core/src/Component';
import { setAttributes } from '../../core/src/utils/setAttributes';

export class IcUserCircleInner extends Component {
    constructor(props) {
        super(props);

        const doc = new DOMParser().parseFromString(
            `<svg id="ic-user-circle" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 32C8 18.7452 18.7452 8 32 8C45.2548 8 56 18.7452 56 32C56 45.2548 45.2548 56 32 56C18.7452 56 8 45.2548 8 32Z" fill="#7E869E" fill-opacity="0.25"/>
            <circle cx="32" cy="26.6667" r="10.6667" fill="#F0F1F3"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M49.5355 50.5017C49.5765 50.5978 49.5521 50.709 49.4749 50.7794C46.6533 53.3525 43.0887 55.1266 39.1288 55.7538C37.5741 56 35.7161 56 32.0001 56C28.2841 56 26.426 56 24.8714 55.7538C20.9116 55.1266 17.347 53.3526 14.5255 50.7796C14.4483 50.7093 14.4239 50.598 14.4649 50.5019C17.0809 44.3738 23.9447 40 32.0002 40C40.0557 40 46.9194 44.3737 49.5355 50.5017Z" fill="#F0F1F3"/>
        </svg>`,
            'image/svg+xml',
        );

        this.element = doc.querySelector('svg#ic-user-circle');
    }

    render(props = {}) {
        setAttributes(this.element, props);

        return this.element;
    }
}

export const IcUserCircle = (props) => new IcUserCircleInner(props);
