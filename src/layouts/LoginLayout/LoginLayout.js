import { Component } from '../../core/src/Component.js';
import { Core } from '../../core/Core.js';
import { LogoButton } from '../../components/LogoButton/LogoButton.js';

import styles from './LoginLayout.module.scss';

class LoginLayoutInner extends Component {
    render(props) {
        return Core.createElement('div', {
            ...props,
            class: [styles['login-layout'], props?.class].join(' '),
            children: [
                Core.createElement('img', {
                    src: '/src/assets/kinoskop_background.jpg',
                    'aria-hidden': 'true',
                    class: styles['img-bg'],
                }),
                LogoButton({ class: styles.logo }),
                ...props.children,
            ],
        });
    }
}

export const LoginLayout = (props) => new LoginLayoutInner(props);
