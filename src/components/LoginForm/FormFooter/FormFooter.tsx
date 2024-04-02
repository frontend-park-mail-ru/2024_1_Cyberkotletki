import styles from './FormFooter.module.scss';

import { routes } from '@/App/App.routes';
import { AppComponent } from '@/appCore/src/AppComponent';
import { Link } from '@/components/Link';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface FormFooterProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref' | 'children'
    > {
    isLogin?: boolean;
}

export class FormFooter extends AppComponent<FormFooterProps> {
    render() {
        const { isLogin, ...props } = this.props;

        return (
            <div {...props}>
                {isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}
                <Link
                    href={isLogin ? routes.register() : routes.login()}
                    className={cx('link')}
                >
                    {isLogin ? 'Зарегистрируйтесь' : 'Войти'}
                </Link>
            </div>
        );
    }
}
