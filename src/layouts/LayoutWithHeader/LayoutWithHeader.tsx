import styles from './LayoutWithHeader.module.scss';

import { AppComponent } from '@/core';
import { Header } from '@/components/Header';
import { concatClasses } from '@/utils';
import { Footer } from '@/components/Footer';

const cx = concatClasses.bind(styles);

export interface AppComponentProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref'
    > {
    withFooter?: boolean;
}

export class LayoutWithHeader extends AppComponent<AppComponentProps> {
    render() {
        const { children, withFooter = true, ...props } = this.props;

        return (
            <div {...props} className={cx('page-container')}>
                <div className={cx('background')}>
                    <Header />
                    <div className={cx('content')}>{children}</div>
                </div>

                {withFooter && <Footer />}
            </div>
        );
    }
}
