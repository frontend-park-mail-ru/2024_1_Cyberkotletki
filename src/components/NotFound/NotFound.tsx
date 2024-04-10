import styles from './NotFound.module.scss';

import type { RoutesValues } from '@/App/App.routes';
import { routes } from '@/App/App.routes';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';
import { Button } from '@/components/Button';

const cx = concatClasses.bind(styles);

export interface NotFoundProps
    extends Omit<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
        'ref'
    > {
    title?: string;
    description?: string;
    withButton?: boolean;
    buttonTitle?: string;
    buttonLink?: RoutesValues;
}

export class NotFound extends AppComponent<NotFoundProps> {
    render() {
        const {
            title = '404',
            description = 'Такой страницы не существует',
            className,
            withButton,
            buttonLink = routes.root(),
            buttonTitle = 'На главную',
            ...props
        } = this.props;

        return (
            <section className={cx('section', className)} {...props}>
                <h1>{title}</h1>
                <p>{description}</p>
                {withButton && (
                    <Button href={buttonLink} className={cx('button')} outlined>
                        {buttonTitle}
                    </Button>
                )}
            </section>
        );
    }
}
