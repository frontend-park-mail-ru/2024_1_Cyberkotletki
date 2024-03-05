import { authService } from '../api/auth/auth.service.js';
import { Core } from '../core/Core.js';
import { Component } from '../core/src/Component.js';

export const AuthContext = Core.createContext({ authStatus: false });

class AuthProviderInner extends Component {
    state = { isLoggedIn: false };

    componentWillMount() {
        this.setState({ isLoggedIn: authService.getIsLoggedIn() });
    }

    render(props, state) {
        return AuthContext.Provider(state, props.children);
    }
}

/**
 * @param {Component} children Один дочерний элемент
 * @returns {Component} Компонент
 */
export const AuthProvider = (children) => new AuthProviderInner({ children });
