import styles from './SearchItem.module.scss';

import { LazyImg } from '@/components/LazyImg';
import type { PersonActor, SearchContent } from '@/api/content/types';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses, getStaticUrl, objectValues } from '@/utils';
import { RatingBadge } from '@/components/RatingBadge';
import { Link } from '@/components/Link';
import { routes } from '@/App/App.routes';

const cx = concatClasses.bind(styles);

export interface SearchItemProps
    extends Omit<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
        'children'
    > {
    film?: SearchContent;
    person?: PersonActor;
}

export class SearchItem extends AppComponent<SearchItemProps> {
    render(): AppNode {
        const { film, person, className, ...props } = this.props;

        const name = film?.title ?? `${person?.name ?? ''}`;

        const personRoles = person?.roles
            ? objectValues(person.roles).flat()
            : [];

        const info = film
            ? [
                  film?.originalTitle,
                  film.country,
                  film.yearStart || film.yearEnd,
              ]
                  .filter(Boolean)
                  .join(', ')
            : personRoles.map((role) => role.title).join(', ');

        return (
            <Link
                href={
                    film
                        ? routes.film(film.id ?? 0)
                        : routes.person(person?.id ?? 0)
                }
                className={cx('link', className)}
                aria-label={name}
            >
                <article className={cx('item')} {...props}>
                    <LazyImg
                        className={cx('image')}
                        src={getStaticUrl(film?.poster ?? person?.photoURL)}
                        alt={name}
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
                                {film.genre}
                            </div>
                        )}
                    </div>
                </article>
            </Link>
        );
    }
}
