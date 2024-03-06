import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';
import { concatClasses } from '../../utils/concatClasses.js';
import { Spinner } from '../Spinner/Spinner.js';

import styles from './Button.module.scss';

const cx = concatClasses.bind(styles);

class ButtonInner extends Component {
    constructor(props) {
        super(props);

        this.button = Core.createElement('button');
        this.Spinner = Spinner();
    }

    render({ class: className, isLoading, children, ...props } = {}) {
        this.props = { class: className, isLoading, ...props };

        return this.button.render({
            ...props,
            children: isLoading ? [this.Spinner.render()] : children,
            class: cx('button', className, { loading: isLoading }),
        });
    }
}

export const Button = (props) => new ButtonInner(props);
