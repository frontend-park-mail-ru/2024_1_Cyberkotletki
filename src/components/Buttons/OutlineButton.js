import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';

class OutlineButtonInner extends Component {
    render(props) {
        return Core.createElement('button', {
            ...props,
            class: 'outline',
        });
    }
}

export const OutlineButton = (props) => new OutlineButtonInner(props);
