import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';
import { concatClasses } from '../../utils/concatClasses.js';

import styles from './Input.module.scss';

const cx = concatClasses.bind(styles);

class InputInner extends Component {
    constructor(props) {
        super(props);

        this.container = Core.createElement('div');
        this.input = Core.createElement('input');
        this.label = Core.createElement('label');
        this.errorHint = Core.createElement('div');
    }

    render({ label, hasError, errorHint, ...props } = {}) {
        this.props = { label, hasError, errorHint, ...props };

        return this.container.render({
            class: styles.container,
            children: [
                label &&
                    this.label.render({
                        class: cx('label'),
                        for: props.id,
                        children: [label],
                    }),
                this.input.render({
                    ...props,
                    class: cx('input', props.class, {
                        'with-error': hasError,
                    }),
                }),
                hasError &&
                    errorHint &&
                    this.errorHint.render({
                        class: cx('error-hint'),
                        children: [errorHint],
                    }),
            ],
        });
    }
}

/**
 *
 * @param {object} props Пропсы
 * @param {boolean} props.hasError `true` - инпут с ошибкой, `false` - без
 * @param {boolean} props.errorHint Строка с ошибкой
 * @returns {Component} Input
 */
export const Input = (props) => new InputInner(props);
