import styles from './Spinner.module.scss';

import { concatClasses } from '@/utils';
import { AppComponent } from '@/appCore/src/AppComponent';

const cx = concatClasses.bind(styles);

export type SpinnerProps = Omit<
    App.DetailedHTMLProps<App.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref' | 'children'
>;

export class Spinner extends AppComponent<SpinnerProps> {
    render() {
        const { className, ...props } = this.props;

        return (
            <div className={cx('container', className)} {...props}>
                <div className={cx('spinner')}></div>
            </div>
        );
    }
}
