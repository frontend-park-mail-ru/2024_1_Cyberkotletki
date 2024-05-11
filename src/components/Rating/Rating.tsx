import styles from './Rating.module.scss';

import type { Film } from '@/api/content/types';
import { AppComponent } from '@/core';
import { concatClasses, isDefined } from '@/utils';

const cx = concatClasses.bind(styles);

export interface RatingProps
    extends Omit<
            App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLDivElement>,
                HTMLDivElement
            >,
            'ref' | 'children'
        >,
        Pick<Film, 'rating' | 'imdbRating'> {}

export class Rating extends AppComponent<RatingProps> {
    render() {
        const { rating, imdbRating, className, ...props } = this.props;

        return (
            <div className={cx('rating', className)} {...props}>
                {isDefined(rating) && (
                    <div
                        className={cx('native-rating', {
                            bad: true,
                            medium: (rating ?? 0) >= 4,
                            good: (rating ?? 0) >= 7,
                        })}
                    >
                        {rating.toFixed(1)}
                    </div>
                )}
                {isDefined(imdbRating) && (
                    <div
                        className={cx('imdb-rating')}
                    >{`IMDB: ${imdbRating.toFixed(1)}`}</div>
                )}
            </div>
        );
    }
}
