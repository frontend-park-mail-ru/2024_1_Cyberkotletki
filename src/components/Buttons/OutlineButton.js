import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';

class OutlineButtonInner extends Component {
    render(props, state) {
        return Core.createElement(
            'button',
            {
                class: 'outline',
                onClick: props.click,
            },
            props.buttonText,
        );
    }
}

export const OutlineButton = (props) => new OutlineButtonInner(props);
