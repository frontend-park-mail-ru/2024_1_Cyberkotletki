import type { FormFieldsType } from './Form.constants';
import { AuthFormError } from './Form.constants';

import type { FormClass } from '@/components/LoginForm/Form/Form';
import { authService } from '@/api/auth/service';
import {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
} from '@/validators/validators';
import { routes } from '@/App/App.routes';

export const getEmailError = (email?: string) => {
    if (!email) {
        return AuthFormError.EMPTY_VALUE;
    }

    if (!validateEmail(email.trim())) {
        return AuthFormError.INVALID_EMAIL;
    }

    return '';
};

export const getPasswordError = (password?: string) => {
    if (!password) {
        return AuthFormError.EMPTY_VALUE;
    }

    const passwordValidation = validatePassword(password);

    if (!passwordValidation.isValid) {
        return AuthFormError[passwordValidation.reasonType];
    }

    return '';
};

export const getPasswordRepeatError = (
    password?: string,
    passwordRepeat?: string,
) => {
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
export const validateForm = (form?: HTMLFormElement, isLogin?: boolean) => {
    const formValidation = {
        isValid: true,
        emailError: '',
        passwordError: '',
        passwordRepeatError: '',
    };

    const formData = new FormData(form);

    const { email, password, passwordRepeat } = Object.fromEntries(
        formData,
    ) as FormFieldsType;

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

export const submitLoginForm = async (
    form?: HTMLFormElement,
    isLogin?: boolean,
) => {
    const formData = new FormData(form);

    const { email, password } = Object.fromEntries(formData) as FormFieldsType;

    if (!email || !password) {
        return;
    }

    if (isLogin) {
        return authService.login(email, password);
    }

    return authService.register(email, password);
};

/**
 * @param {Event} e Form Event
 * @returns {boolean} `false`
 */
export function submitForm(this: FormClass, e: App.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { isLogin, context } = this.props;

    const formValidation = validateForm(e.currentTarget, isLogin);

    if (formValidation.isValid) {
        this.setState((prev) => ({
            ...prev,
            isLoading: true,
        }));

        submitLoginForm(e.currentTarget, isLogin)
            .then(() => {
                const { history, auth, profile } = context ?? {};

                void auth?.getIsAuth?.();
                void profile?.getProfile?.();
                history?.changeRoute(routes.root());

                this.setState((prev) => ({
                    ...prev,
                    error: '',
                    isLoading: false,
                }));
            })
            .catch((error) => {
                if (error instanceof Error) {
                    this.setState((prev) => ({
                        ...prev,
                        error: error.message,
                        isLoading: false,
                    }));
                }
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
export function changeEmailInput(
    this: FormClass,
    e: App.ChangeEvent<HTMLInputElement>,
) {
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
export function inputEmailInput(
    this: FormClass,
    e: App.FormEvent<HTMLInputElement>,
) {
    if (this.state.emailError) {
        const error = getEmailError(e.currentTarget.value);

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
export function changePasswordInput(
    this: FormClass,
    e: App.ChangeEvent<HTMLInputElement>,
) {
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
export function inputPasswordInput(
    this: FormClass,
    e: App.FormEvent<HTMLInputElement>,
) {
    if (this.state.passwordError) {
        const error = getPasswordError(e.currentTarget.value);

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
export function changeRepeatPasswordInput(
    this: FormClass,
    e: App.ChangeEvent<HTMLInputElement>,
) {
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
export function inputRepeatPasswordInput(
    this: FormClass,
    e: App.FormEvent<HTMLInputElement>,
) {
    if (this.state.passwordRepeatError) {
        const error = getPasswordRepeatError(
            this.state.passwordValue,
            e.currentTarget.value,
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
