import styles from './SearchItem.module.scss';

import { LazyImg } from '@/components/LazyImg';
import type { Film, PersonActor } from '@/api/content/types';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses, getStaticUrl } from '@/utils';
import { RatingBadge } from '@/components/RatingBadge';
import { Link } from '@/components/Link';
import { routes } from '@/App/App.routes';

const cx = concatClasses.bind(styles);

export interface SearchItemProps
    extends Omit<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
        'children'
    > {
    film?: Film;
    person?: PersonActor;
}

export class SearchItem extends AppComponent<SearchItemProps> {
    render(): AppNode {
        const { film, person, className, ...props } = this.props;

        const name =
            film?.title ??
            `${person?.firstName ?? ''} ${person?.lastName ?? ''}`;

        const info = film
            ? [
                  film?.originalTitle,
                  film?.countries?.join(', '),
                  new Date(film?.movie?.release ?? new Date()).getFullYear(),
              ]
                  .filter(Boolean)
                  .join(', ')
            : person?.roles.map((role) => role.title).join(', ');

        return (
            <Link
                href={
                    film ? routes.film(film.id) : routes.person(person?.id ?? 0)
                }
                className={cx('link', className)}
            >
                <article className={cx('item')} {...props}>
                    <LazyImg
                        className={cx('image')}
                        src={getStaticUrl(film?.posterURL ?? person?.photoURL)}
                    />
                    <div className={cx('info-container')}>
                        <h1 className={cx('head')} title={name}>
                            {name}
                        </h1>
                        <p className={cx('info')} title={info}>
                            {info}
                        </p>
                        {film && (
                            <div className={cx('film-info')}>
                                <RatingBadge
                                    rating={film?.rating}
                                    className={cx('rating')}
                                />
                                {film?.genres?.join(', ')}
                            </div>
                        )}
                    </div>
                </article>
            </Link>
        );
    }
}
