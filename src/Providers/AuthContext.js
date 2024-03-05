import { Core } from '../core/Core.js';

class AuthContextValue {
    authStatus = false; // Пользователь по умолчанию не авторизован
}

export const AuthContext = Core.createContext(new AuthContextValue());
