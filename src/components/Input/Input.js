import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';
import { concatClasses } from '../../utils/concatClasses.js';

import styles from './Input.module.scss';

const cx = concatClasses.bind(styles);

class InputInner extends Component {
    render(props = {}) {
        return Core.createElement('div', {
            class: styles.container,
            children: [
                props?.label &&
                    Core.createElement('label', {
                        class: cx('label'),
                        for: props.id,
                        children: [props.label],
                    }),
                Core.createElement('input', {
                    ...props,
                    class: cx('input', {
                        'with-error': props.hasError,
                    }),
                }),
                props.hasError &&
                    props.errorHint &&
                    Core.createElement('div', {
                        class: cx('error-hint'),
                        children: [props.errorHint],
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
