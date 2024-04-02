import styles from './LayoutWithHeader.module.scss';

import { AppComponent } from '@/appCore/src/AppComponent';
import { Header } from '@/components/Header';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export type AppComponentProps = Omit<
    App.DetailedHTMLProps<App.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref'
>;

export class LayoutWithHeader extends AppComponent<AppComponentProps> {
    render() {
        const { children, ...props } = this.props;

        return (
            <div {...props} className={cx('page-container')}>
                <Header />
                <div className={cx('content')}>{children}</div>
            </div>
        );
    }
}
