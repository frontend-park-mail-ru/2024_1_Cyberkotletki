import styles from './Button.module.scss';

import { AppComponent } from '@/appCore/src/AppComponent';
import { Spinner } from '@/components/Spinner';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles as Record<string, string | undefined>);

export interface InputProps
    extends App.DetailedHTMLProps<
        App.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    isLoading?: boolean;
}

export class Button extends AppComponent<InputProps> {
    render() {
        const { isLoading, className, children, ...props } = this.props ?? {};

        return (
            <button
                {...props}
                className={cx('button', className, { loading: isLoading })}
            >
                {isLoading ? <Spinner /> : children}
            </button>
        );
    }
}
