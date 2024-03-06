import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';

import styles from './LoginLayout.module.scss';

class LoginLayoutInner extends Component {
    render(props) {
        return Core.createElement('div', {
            ...props,
            class: [styles['login-layout'], props?.class].join(' '),
            children: [
                Core.createElement('img', {
                    src: '/src/assets/img-bg-films.webp',
                    'aria-hidden': 'true',
                    class: styles['img-bg'],
                }),
                ...props.children,
            ],
        });
    }
}

export const LoginLayout = (props) => new LoginLayoutInner(props);
