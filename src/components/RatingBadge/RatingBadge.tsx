import styles from './RatingBadge.module.scss';

import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface RatingBadgeProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref' | 'children'
    > {
    rating?: number;
}

export class RatingBadge extends AppComponent<RatingBadgeProps> {
    render() {
        const { rating, className, ...props } = this.props;

        return (
            <div
                {...props}
                className={cx('rating-circle', className, {
                    bad: true,
                    medium: (rating ?? 0) >= 4,
                    good: (rating ?? 0) >= 7,
                })}
            >
                {rating?.toFixed(1)}
            </div>
        );
    }
}
