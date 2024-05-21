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
    const trimEmail = email?.trim();

    if (!trimEmail) {
        return AuthFormError.EMPTY_VALUE;
    }

    if (!validateEmail(trimEmail)) {
        return AuthFormError.INVALID_EMAIL;
    }

    return '';
};

export const getPasswordError = (password?: string, isStrong = true) => {
    const trimPassword = password?.trim();

    if (!trimPassword) {
        return {
            isValid: false,
            message: AuthFormError.EMPTY_VALUE,
            complexity: '',
        };
    }

    if (!isStrong) {
        return {
            isValid: true,
            message: '',
            complexity: '',
        };
    }

    const passwordValidation = validatePassword(trimPassword);

    if (!passwordValidation.isValid) {
        return {
            ...passwordValidation,
            message: AuthFormError[passwordValidation.reasonType],
        };
    }

    return {
        ...passwordValidation,
        message: '',
    };
};

export const getPasswordRepeatError = (
    password?: string,
    passwordRepeat?: string,
) => {
    const trimPasswordRepeat = passwordRepeat?.trim();

    if (!trimPasswordRepeat) {
        return AuthFormError.EMPTY_VALUE;
    }

    if (!validatePasswordMatch(password, trimPasswordRepeat)) {
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

    const passwordError = getPasswordError(password, !isLogin).message;

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
        return authService.login(email.trim(), password.trim());
    }

    return authService.register(email.trim(), password.trim());
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
                const { history, profile } = context ?? {};

                void profile?.getProfile?.().then(() => {
                    history?.changeRoute(routes.root(), undefined, true);
                });

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
                error: '',
                emailError: error,
            }));
        }
    }

    this.setState((prev) => ({
        ...prev,
        error: '',
    }));
}

/**
 * @param {Event} e Input Event
 */
export function changePasswordInput(
    this: FormClass,
    e: App.ChangeEvent<HTMLInputElement>,
) {
    this.state.passwordValue = e.target.value;

    const passwordError = getPasswordError(
        e.target.value,
        !this.props.isLogin,
    ).message;

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
    this.state.passwordValue = e.currentTarget.value;

    if (this.state.passwordError) {
        const { message } = getPasswordError(
            e.currentTarget.value,
            !this.props.isLogin,
        );

        if (!message) {
            this.setState((prev) => ({
                ...prev,
                passwordError: '',
            }));
        } else if (message !== this.state.passwordError) {
            this.setState((prev) => ({
                ...prev,
                passwordError: message,
            }));
        }
    }

    if (
        this.state.passwordRepeatError &&
        e.currentTarget.value === this.state.passwordRepeatValue
    ) {
        this.setState((prev) => ({
            ...prev,
            passwordRepeatError: '',
        }));
    }

    this.setState((prev) => ({
        ...prev,
        error: '',
    }));
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
    this.state.passwordRepeatValue = e.currentTarget.value;

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

    this.setState((prev) => ({
        ...prev,
        error: '',
    }));
}
