import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';
import { concatClasses } from '../../utils/concatClasses.js';

import styles from './Spinner.module.scss';

const cx = concatClasses.bind(styles);

class SpinnerInner extends Component {
    constructor(props) {
        super(props);

        this.spinner = Core.createElement('div');

        this.container = Core.createElement(
            'div',
            Core.createElement('div', { class: cx('spinner') }),
        );
    }

    render(props = {}) {
        this.props = props;

        return this.container.render({
            ...this.props,
            class: cx('container', props.children),
        });
    }
}

export const Spinner = (props) => new SpinnerInner(props);
