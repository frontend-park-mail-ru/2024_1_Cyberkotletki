import styles from './LoginForm.module.scss';
import { Form } from './Form';
import { FormFooter } from './FormFooter';

import { concatClasses } from '@/utils/concatClasses';
import { icUserUrl } from '@/assets/icons';
import { AppComponent } from '@/core';
import { Icon } from '@/components/Icon';

const cx = concatClasses.bind(styles);

export interface LoginFormProps {
    isLogin?: boolean;
}

export class LoginForm extends AppComponent<LoginFormProps> {
    render() {
        const { isLogin } = this.props;

        return (
            <section
                className={cx('section')}
                key={isLogin ? 'login-form' : 'register-form'}
            >
                <Icon icon={icUserUrl} className={cx('user-icon')} />
                <h1>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
                <Form isLogin={isLogin} />
                <FormFooter isLogin={isLogin} className={cx('footer')} />
            </section>
        );
    }
}
