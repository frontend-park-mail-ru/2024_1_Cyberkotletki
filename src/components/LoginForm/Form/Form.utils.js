/**
 *
 * @param {HTMLFormElement} form Элемент формы
 * @param {boolean} isLogin Вид формы
 */

import { routes } from '../../../App/App.routes.js';
import { authService } from '../../../api/auth/auth.service.js';
import { RESPONSE_ERROR_CODE } from '../../../shared/constants.js';
import {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
} from '../../../validators/validators.js';

import { AuthFormError } from './Form.contstants.js';

export const getErrorMessage = (code) => {
    switch (code) {
        case RESPONSE_ERROR_CODE[404]:
            return AuthFormError.INCORRECT_DATA;
        case RESPONSE_ERROR_CODE[400]:
            return AuthFormError.EMAIL_EXISTS;
        default:
            return AuthFormError.UNKNOWN_ERROR;
    }
};

export const getEmailError = (email) => {
    if (!email) {
        return AuthFormError.EMPTY_VALUE;
    }

    if (!validateEmail(email.trim())) {
        return AuthFormError.INVALID_EMAIL;
    }

    return '';
};

export const getPasswordError = (password) => {
    if (!password) {
        return AuthFormError.EMPTY_VALUE;
    }

    const passwordValidation = validatePassword(password);

    if (!passwordValidation.isValid) {
        return AuthFormError[passwordValidation.reasonType];
    }

    return '';
};

export const getPasswordRepeatError = (password, passwordRepeat) => {
    if (!passwordRepeat) {
        return AuthFormError.EMPTY_VALUE;
    }

    if (!validatePasswordMatch(password, passwordRepeat)) {
        return AuthFormError.NOT_MATCH_PASSWORDS;
    }

    return '';
};

/**
 * @param {HTMLFormElement} form Form Element
 * @param {boolean} isLogin isLogin
 * @returns {{
 * isValid:boolean,
 * emailError:string,
 * passwordError:string,
 * passwordRepeatError:string}}
 * Form Validation
 */
export const validateForm = (form, isLogin) => {
    const formValidation = {
        isValid: true,
        emailError: '',
        passwordError: '',
        passwordRepeatError: '',
    };

    const formData = new FormData(form);

    const { email, password, passwordRepeat } = Object.fromEntries(formData);

    const emailError = getEmailError(email);

    if (emailError) {
        formValidation.emailError = emailError;
        formValidation.isValid = false;
    }

    const passwordError = getPasswordError(password);

    if (passwordError) {
        formValidation.passwordError = passwordError;
        formValidation.isValid = false;
    }

    if (!isLogin) {
        const passwordRepeatError = getPasswordRepeatError(
            password,
            passwordRepeat,
        );

        if (passwordRepeatError) {
            formValidation.passwordRepeatError = passwordRepeatError;
            formValidation.isValid = false;
        }
    }

    return formValidation;
};

export const submitLoginForm = async (form, isLogin) => {
    const formData = new FormData(form);

    const { email, password } = Object.fromEntries(formData);

    if (isLogin) {
        await authService.login(email, password);
    } else {
        await authService.register(email, password);
    }
};

/**
 * @param {Event} e Form Event
 * @returns {boolean} `false`
 */
export function submitForm(e) {
    e.preventDefault();

    const formValidation = validateForm(e.target, this.props.isLogin);

    if (formValidation.isValid) {
        this.setState((prev) => ({
            ...prev,
            isLoading: true,
        }));

        submitLoginForm(e.target, this.props.isLogin)
            .then(() => {
                const { changeRoute, getIsAuth } = this.props.context;

                changeRoute(routes.root());
                getIsAuth();

                this.setState((prev) => ({
                    ...prev,
                    error: '',
                    isLoading: false,
                }));
            })
            .catch((error) => {
                this.setState((prev) => ({
                    ...prev,
                    error: error.message,
                    isLoading: false,
                }));
            });
    } else {
        this.setState((prev) => ({
            ...prev,
            ...formValidation,
        }));
    }

    return false;
}

/**
 * @param {Event} e Input Event
 */
export function changeEmailInput(e) {
    this.state.emailValue = e.target.value;

    const emailError = getEmailError(e.target.value);

    this.setState((prev) => ({
        ...prev,
        error: '',
        emailError,
    }));
}

/**
 * @param {Event} e Input Event
 */
export function inputEmailInput(e) {
    if (this.state.emailError) {
        const error = getEmailError(e.target.value);

        if (!error) {
            this.setState((prev) => ({
                ...prev,
                emailError: '',
            }));
        } else if (error !== this.state.emailError) {
            this.setState((prev) => ({
                ...prev,
                emailError: error,
            }));
        }
    }
}

/**
 * @param {Event} e Input Event
 */
export function changePasswordInput(e) {
    this.state.passwordValue = e.target.value;

    const passwordError = getPasswordError(e.target.value);

    this.setState((prev) => ({
        ...prev,
        error: '',
        passwordError,
    }));
}

/**
 * @param {Event} e Input Event
 */
export function inputPasswordInput(e) {
    if (this.state.passwordError) {
        const error = getPasswordError(e.target.value);

        if (!error) {
            this.setState((prev) => ({
                ...prev,
                passwordError: '',
            }));
        } else if (error !== this.state.passwordError) {
            this.setState((prev) => ({
                ...prev,
                passwordError: error,
            }));
        }
    }
}

/**
 * @param {Event} e Input Event
 */
export function changeRepeatPasswordInput(e) {
    this.state.passwordRepeatValue = e.target.value;

    const passwordRepeatError = getPasswordRepeatError(
        this.state.passwordValue,
        e.target.value,
    );

    this.setState((prev) => ({
        ...prev,
        error: '',
        passwordRepeatError,
    }));
}

/**
 * @param {Event} e Input Event
 */
export function inputRepeatPasswordInput(e) {
    if (this.state.passwordRepeatError) {
        const error = getPasswordRepeatError(
            this.state.passwordValue,
            e.target.value,
        );

        if (!error) {
            this.setState((prev) => ({
                ...prev,
                passwordRepeatError: '',
            }));
        } else if (error !== this.state.passwordRepeatError) {
            this.setState((prev) => ({
                ...prev,
                passwordRepeatError: error,
            }));
        }
    }
}
