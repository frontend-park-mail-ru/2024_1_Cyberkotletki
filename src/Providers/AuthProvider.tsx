import { authService } from '@/api/auth/service';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import type { AppContext } from '@/types/Context.types';

export interface AuthContextProps {
    isLoggedIn?: JSX.Children;
    getIsAuth?: () => void;
}

export const AuthContext = new Context<AppContext>({
    auth: { isLoggedIn: false, getIsAuth: () => null },
});

export interface AuthProviderProps {
    children?: JSX.Element;
}

export class AuthProvider extends AppComponent<
    AuthProviderProps,
    AuthContextProps
> {
    componentWillMount() {
        this.state.isLoggedIn = false;

        this.state.getIsAuth = () => {
            authService
                .isAuth()
                .then(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isLoggedIn: true,
                    }));
                })
                .catch(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isLoggedIn: false,
                    }));
                });
        };

        this.state.getIsAuth();
    }

    render() {
        const { children } = this.props;

        return (
            <AuthContext.Provider
                value={{
                    auth: {
                        getIsAuth: this.state.getIsAuth,
                        isLoggedIn: this.state.isLoggedIn,
                    },
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    }
}
