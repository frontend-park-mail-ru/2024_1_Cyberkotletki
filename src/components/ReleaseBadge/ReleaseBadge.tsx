import styles from './ReleaseBadge.module.scss';

import { AppComponent } from '@/core';
import { concatClasses, getDateString } from '@/utils';

const cx = concatClasses.bind(styles);

export interface ReleaseBadgeProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref' | 'children'
    > {
    date?: string;
}

export class ReleaseBadge extends AppComponent<ReleaseBadgeProps> {
    render() {
        const { date, className, ...props } = this.props;

        return (
            <div {...props} className={cx('badge', className)}>
                {getDateString(date, false)}
            </div>
        );
    }
}
