import { authService } from '../api/auth/service.ts';
import { Core } from '../core/Core.js';
import { Component } from '../core/src/Component.js';

export const AuthContext = Core.createContext({ isLoggedIn: false });

class AuthProviderInner extends Component {
    state = { isLoggedIn: false };

    componentWillMount() {
        this.getIsAuth();
    }

    getIsAuth() {
        authService
            .isAuth()
            .then(() => {
                this.setState({ isLoggedIn: true });
            })
            .catch(() => {
                this.setState({ isLoggedIn: false });
            });
    }

    render(props, state) {
        return AuthContext.Provider(
            {
                isLoggedIn: state.isLoggedIn,
                getIsAuth: () => {
                    this.getIsAuth();
                },
            },
            props.children,
        );
    }
}

/**
 * @param {Component} children Один дочерний элемент
 * @returns {Component} Компонент
 */
export const AuthProvider = (children) => new AuthProviderInner({ children });
