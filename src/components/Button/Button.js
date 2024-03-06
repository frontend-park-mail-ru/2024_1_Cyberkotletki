import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';

import styles from './Button.module.scss';

class ButtonInner extends Component {
    render(props = {}) {
        return Core.createElement('button', {
            ...props,
            class: [styles.button, props.class ?? ''].join(' '),
        });
    }
}

export const Button = (props) => new ButtonInner(props);
