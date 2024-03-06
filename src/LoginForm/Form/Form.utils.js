/**
 *
 * @param {HTMLFormElement} form Элемент формы
 * @param {boolean} isLogin Вид формы
 */

import { authService } from '../../api/auth/auth.service.js';
import {
    validateEmail,
    validatePasswordLength,
    validatePasswordMatch,
} from '../../validators/validators';

export const submitLoginForm = async (form, isLogin) => {
    const formData = new FormData(form);

    const { email, password, passwordRepeat } = Object.fromEntries(formData);

    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePasswordLength(password);

    if (isValidEmail && isValidPassword) {
        if (isLogin) {
            return authService.login(email, password);
        }

        if (validatePasswordMatch(password, passwordRepeat)) {
            return authService.register(email, password);
        }
    }
};
