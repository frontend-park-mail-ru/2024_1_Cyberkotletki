import styles from './BaseDataForm.module.scss';
import { getNameError, validateBaseForm } from './BaseDataForm.utils';

import { ProfileContext } from '@/Providers/ProfileProvider';
import { userService } from '@/api/user/service';
import type { ChangeProfileBody } from '@/api/user/types';
import { Button } from '@/components/Button';
import { CheckMark } from '@/components/CheckMark';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/Input';
import { getEmailError } from '@/components/LoginForm/Form/Form.utils';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import type { AppContext } from '@/types/Context.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface AppComponentProps {
    emailInitial?: string;
    nameInitial?: string;
    context?: AppContext;
    onSubmit?: () => void;
}

export interface AppComponentState {
    isLoading?: boolean;
    emailError: string;
    nameError?: string;
    formError?: string;
    isSuccess?: boolean;
}

export const BASE_DATA_FIELDS: Record<
    'EMAIL' | 'NAME',
    keyof ChangeProfileBody
> = {
    EMAIL: 'email',
    NAME: 'name',
} as const;

export class BaseDataFormInner extends AppComponent<
    AppComponentProps,
    AppComponentState
> {
    handleFormSubmit = (e: App.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = Object.fromEntries(formData) as ChangeProfileBody;

        const { emailInitial, nameInitial } = this.props;

        const validation = validateBaseForm(body, {
            emailInitial,
            nameInitial,
        });

        if (!validation.isValid) {
            this.setState((prev) => ({ ...prev, ...validation }));

            return false;
        }

        this.setState((prev) => ({ ...prev, isLoading: true }));

        void userService
            .updateProfile(body)
            .then(() => {
                this.setState((prev) => ({
                    ...prev,
                    formError: '',
                    isSuccess: true,
                }));
                this.props.onSubmit?.();
            })
            .catch((error) => {
                if (error instanceof Error) {
                    this.setState((prev) => ({
                        ...prev,
                        formError: error.message,
                    }));
                }
            })
            .finally(() => {
                this.setState((prev) => ({ ...prev, isLoading: false }));
            });

        return false;
    };

    handleChangeEmail = (e: App.ChangeEvent<HTMLInputElement>) => {
        const emailError = getEmailError(e.currentTarget.value);

        if (emailError) {
            this.setState((prev) => ({ ...prev, emailError }));
        }
    };

    handleInputEmail = (e: App.FormEvent<HTMLInputElement>) => {
        if (this.state.emailError) {
            const emailError = getEmailError(e.currentTarget.value);

            this.setState((prev) => ({ ...prev, emailError }));
        }
    };

    handleChangeName = (e: App.ChangeEvent<HTMLInputElement>) => {
        const nameError = getNameError(e.currentTarget.value);

        if (nameError) {
            this.setState((prev) => ({ ...prev, nameError }));
        }
    };

    handleInputName = (e: App.FormEvent<HTMLInputElement>) => {
        if (this.state.nameError) {
            const nameError = getNameError(e.currentTarget.value);

            this.setState((prev) => ({ ...prev, nameError }));
        }
    };

    render(): AppNode {
        const { emailInitial, nameInitial } = this.props;
        const { emailError, nameError, isLoading, formError, isSuccess } =
            this.state;

        return (
            <form className={cx('form')} onSubmit={this.handleFormSubmit}>
                <Input
                    name={BASE_DATA_FIELDS.EMAIL}
                    label="Email"
                    value={emailInitial}
                    id={BASE_DATA_FIELDS.EMAIL}
                    type="text"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Введите email..."
                    required
                    hasError={!!emailError}
                    errorHint={emailError}
                    onChange={this.handleChangeEmail}
                    onInput={this.handleInputEmail}
                />
                <Input
                    id={BASE_DATA_FIELDS.NAME}
                    label="Имя"
                    name={BASE_DATA_FIELDS.NAME}
                    value={nameInitial}
                    type="text"
                    autoComplete="username"
                    placeholder="Введите имя..."
                    required
                    hasError={!!nameError}
                    errorHint={nameError}
                    onChange={this.handleChangeName}
                    onInput={this.handleInputName}
                />
                <Button
                    outlined
                    styleType="secondary"
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                    className={cx('button')}
                >
                    Обновить
                    <CheckMark show={isSuccess} />
                </Button>
                {!!formError && <ErrorMessage message={formError} />}
            </form>
        );
    }
}

export const BaseDataForm = ProfileContext.Connect(BaseDataFormInner);
