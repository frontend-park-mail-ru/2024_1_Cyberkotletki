import styles from './FilmCard.module.scss';

import { AppComponent } from '@/core';
import { RatingBadge } from '@/components/RatingBadge';
import { Config } from '@/shared/constants';
import { concatClasses, getHumanDate } from '@/utils';
import type { Film } from '@/api/content/types';
import { LazyImg } from '@/components/LazyImg';
import { Link } from '@/components/Link';
import { routes } from '@/App/App.routes';

const cx = concatClasses.bind(styles);

export interface FilmCardProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref' | 'children'
    > {
    filmId?: number;
    film?: Film;
}

export class FilmCard extends AppComponent<FilmCardProps> {
    render() {
        const { className, film, ...props } = this.props;

        return (
            <div {...props} className={cx('card', className)}>
                <Link href={routes.film(`${film?.id ?? 0}`)}>
                    <div className={cx('poster')}>
                        <RatingBadge rating={film?.rating} />
                        <LazyImg
                            className={cx('i')}
                            src={`${Config.BACKEND_URL}/static/${film?.posterURL ?? ''}`}
                            alt="Постер"
                        />
                    </div>
                </Link>
                <article className={cx('card-info')}>
                    <h1>
                        <Link href={routes.film(`${film?.id ?? 0}`)}>
                            {film?.title}
                        </Link>
                    </h1>
                    <span>
                        {[
                            film?.originalTitle || film?.title,
                            getHumanDate(film?.movie?.release),
                            `${film?.movie?.duration ?? '0'} мин.`,
                        ]
                            .filter(Boolean)
                            .join(', ')}
                    </span>
                    <span>
                        {[
                            film?.countries?.[0],
                            film?.genres?.[0],
                            film?.directors?.[0]
                                ? `Режиссёр: ${film.directors[0].firstName ?? film.directors[0].lastName ?? ''}`
                                : '',
                        ]
                            .filter(Boolean)
                            .join(' ▸ ')}
                    </span>
                    {!!film?.actors?.length && (
                        <span>{`В ролях: ${film.actors.map((actor) => `${actor.firstName} ${actor.lastName}`).join(', ')}`}</span>
                    )}
                </article>
            </div>
        );
    }
}
