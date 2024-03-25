import { Core } from '../../core/Core.js';
import { Component } from '../../core/src/Component.js';
import { OutlineButton } from '../Buttons/OutlineButton.js';
import { routes } from '../../App/App.routes.js';
import { AuthContext } from '../../Providers/AuthProvider.js';
import { HistoryContext } from '../../Providers/HistoryProvider.js';
import { IcUserCircle } from '../../assets/icons/IcUserCircle.js';
import { LogoButton } from '../LogoButton/LogoButton.js';
import { authService } from '../../api/auth/auth.service.js';

import styles from './Header.module.scss';

class HeaderInner extends Component {
    render(props) {
        return Core.createElement(
            'header',
            { class: 'header' },
            Core.createElement(
                'div',
                { class: 'header-container' },
                // Header logo
                Core.createElement(
                    'div',
                    { class: 'header-logo' },
                    LogoButton(),
                ),
                Core.createElement(
                    'div',
                    { class: 'header-panel' },
                    props?.context?.isLoggedIn
                        ? Core.createElement(
                              'div',
                              { class: styles.avatar },
                              Core.createElement('div', {
                                  onClick: () => {
                                      authService.logout();
                                      props.context.getIsAuth();
                                  },
                                  class: styles['logout-button'],
                                  children: ['Выйти'],
                              }),
                              IcUserCircle(),
                          )
                        : OutlineButton({
                              onClick: () => {
                                  const { changeRoute } = props.context;
                                  changeRoute(routes.login());
                              },
                              children: ['Войти'],
                          }),
                ),
            ),
        );
    }
}

export const Header = AuthContext.Connect(
    HistoryContext.Connect((props) => new HeaderInner(props)),
);
