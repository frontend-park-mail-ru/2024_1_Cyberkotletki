import styles from './FilmCard.module.scss';

import { AppComponent } from '@/core';
import { RatingBadge } from '@/components/RatingBadge';
import { concatClasses, getHumanDate, getStaticUrl } from '@/utils';
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
    size?: 'small' | 'large';
}

export class FilmCard extends AppComponent<FilmCardProps> {
    render() {
        const { className, film, size = 'large', ...props } = this.props;

        return (
            <article
                {...props}
                className={cx('card', { small: size === 'small' }, className)}
            >
                <Link href={routes.film(`${film?.id ?? 0}`)}>
                    <div className={cx('poster')}>
                        <RatingBadge rating={film?.rating} />
                        <LazyImg
                            src={getStaticUrl(film?.posterURL)}
                            alt="Постер"
                            width="136px"
                            height="200px"
                        />
                    </div>
                </Link>
                <div className={cx('card-info', { small: size === 'small' })}>
                    <Link href={routes.film(`${film?.id ?? 0}`)}>
                        <h1 className={cx('title')} title={film?.title}>
                            {film?.title}
                        </h1>
                    </Link>
                    {size === 'large' ? (
                        <div className={cx('info')}>
                            <span>
                                {[
                                    film?.originalTitle || '',
                                    film?.movie?.release
                                        ? getHumanDate(film?.movie?.release)
                                        : '',
                                    film?.movie?.duration
                                        ? `${film?.movie?.duration} мин.`
                                        : '',
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
                        </div>
                    ) : (
                        <div className={cx('info', 'small')}>
                            {[
                                film?.movie?.release
                                    ? new Date(
                                          film?.movie?.release,
                                      ).getFullYear()
                                    : '',
                                ...(film?.genres ?? []),
                            ]?.join(', ')}
                        </div>
                    )}
                </div>
            </article>
        );
    }
}
