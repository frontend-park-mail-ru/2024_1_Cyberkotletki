import { OutlineButton } from '../Buttons/OutlineButton.js';
import { LogoButton } from '../LogoButton/LogoButton.js';

import styles from './Header.module.scss';

import { Core } from '@/core/Core';
import { Component } from '@/core/src/Component';
import { routes } from '@/App/App.routes';
import { AuthContext } from '@/Providers/AuthProvider';
import { HistoryContext } from '@/Providers/HistoryProvider';
import { IcUserCircle } from '@/assets/icons/IcUserCircle';
import { authService } from '@/api/auth/service';

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
