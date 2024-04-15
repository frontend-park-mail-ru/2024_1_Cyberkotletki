import { authService } from '@/api/auth/service';
import { AppComponent } from '@/core';
import { Context } from '@/core/src/Context';
import type { AppContext } from '@/types/Context.types';

export interface AuthContextValues {
    isLoggedIn: JSX.Children;
    getIsAuth: () => Promise<boolean>;
}

export const AuthContext = new Context<AppContext>({});

export interface AuthProviderProps {
    children?: JSX.Element;
}

export class StoreProvider extends AppComponent<
    AuthProviderProps,
    AuthContextValues
> {
    state: AuthContextValues = {
        isLoggedIn: false,
        getIsAuth: () =>
            authService
                .isAuth()
                .then(() => {
                    this.setState((prev) => ({ ...prev, isLoggedIn: true }));

                    return true;
                })
                .catch(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isLoggedIn: false,
                    }));

                    return false;
                }),
    };

    render() {
        const { children } = this.props;

        return (
            <AuthContext.Provider value={{ auth: this.state }}>
                {children}
            </AuthContext.Provider>
        );
    }
}
