import styles from './Form.module.scss';
import {
    EMAIL_INPUT_PROPS,
    PASSWORD_INPUT_PROPS,
    PASSWORD_REPEAT_INPUT_PROPS,
} from './Form.contstants';

import { AppComponent } from '@/appCore/src/AppComponent';
import { Input } from '@/components/Input';
import { concatClasses } from '@/utils';
import { Button } from '@/components/Button/Button';

const cx = concatClasses.bind(styles);

export interface FormProps
    extends Omit<
        App.DetailedHTMLProps<
            App.FormHTMLAttributes<HTMLFormElement>,
            HTMLFormElement
        >,
        'ref' | 'children'
    > {
    isLogin?: boolean;
}

export interface FormState {
    emailError: string;
    passwordError: string;
    passwordRepeatError: string;
    emailValue: string;
    passwordValue: string;
    passwordRepeatValue: string;
    isLoading: boolean;
    error: string;
}

export class Form extends AppComponent<FormProps, FormState> {
    render() {
        const { className, isLogin, ...props } = this.props ?? {};
        const { isLoading, error } = this.state;

        return (
            <form className={cx('form', className)} {...props}>
                <Input {...EMAIL_INPUT_PROPS} />
                <Input
                    {...PASSWORD_INPUT_PROPS}
                    autoComplete={isLogin ? 'password' : 'new-password'}
                />
                {!isLogin && <Input {...PASSWORD_REPEAT_INPUT_PROPS} />}
                <Button className={cx('button')} isLoading={isLoading}>
                    {isLogin ? 'Войти' : 'Продолжить'}
                </Button>
                {error && <div className={cx('error')}></div>}
            </form>
        );
    }
}
