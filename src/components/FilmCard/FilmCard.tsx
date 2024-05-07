import styles from './FilmCard.module.scss';

import { AppComponent } from '@/core';
import { RatingBadge } from '@/components/RatingBadge';
import {
    clickOnEnter,
    concatClasses,
    getHumanDate,
    getStaticUrl,
} from '@/utils';
import type { Film } from '@/api/content/types';
import { LazyImg } from '@/components/LazyImg';
import { Link } from '@/components/Link';
import { routes } from '@/App/App.routes';
import { Button } from '@/components/Button';
import { icTrashUrl } from '@/assets/icons';

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
    withDeleteButton?: boolean;
    onDeleteClick?: (film?: Film) => void;
}

export class FilmCard extends AppComponent<FilmCardProps> {
    linkRef: App.RefObject<HTMLAnchorElement> = { current: null };

    render() {
        const {
            className,
            film,
            size = 'large',
            withDeleteButton,
            onDeleteClick,
            ...props
        } = this.props;

        return (
            <article
                {...props}
                className={cx('card', { small: size === 'small' }, className)}
                role="button"
                tabIndex={0}
                onClick={() => {
                    this.linkRef.current?.click();
                }}
                onKeyDown={clickOnEnter}
            >
                <div
                    className={cx('poster', {
                        'full-width': size === 'small',
                        'left-shadow': withDeleteButton,
                    })}
                >
                    <RatingBadge rating={film?.rating} />
                    <LazyImg
                        src={getStaticUrl(film?.posterURL)}
                        className={cx('poster-img')}
                        alt="Постер"
                        width="136px"
                        height="200px"
                    />
                    {withDeleteButton && (
                        <Button
                            isIconOnly
                            outlined
                            styleType="error"
                            title="Удалить"
                            onClick={(e) => {
                                e.stopPropagation();

                                onDeleteClick?.(film);

                                return false;
                            }}
                            className={cx('remove-button')}
                        >
                            <img src={icTrashUrl} aria-hidden />
                        </Button>
                    )}
                </div>
                <div className={cx('card-info', { small: size === 'small' })}>
                    <Link
                        href={routes.film(film?.id ?? 0)}
                        tabIndex={-1}
                        aria-label={film?.title}
                        ref={this.linkRef}
                    >
                        <h1 className={cx('title')} title={film?.title}>
                            {film?.title}
                        </h1>
                    </Link>
                    {size === 'large' ? (
                        <div className={cx('info')}>
                            <span>
                                {[
                                    film?.originalTitle || '',
                                    film?.movie?.release ||
                                    film?.movie?.premiere
                                        ? getHumanDate(
                                              film?.movie?.release ||
                                                  film?.movie?.premiere,
                                          )
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
                                        ? `Режиссёр: ${film.directors[0].name ?? ''}`
                                        : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ▸ ')}
                            </span>
                            {!!film?.actors?.length && (
                                <span>{`В ролях: ${film.actors.map((actor) => actor.name).join(', ')}`}</span>
                            )}
                        </div>
                    ) : (
                        <div className={cx('info', 'small')}>
                            {[
                                film?.movie?.release || film?.movie?.premiere
                                    ? new Date(
                                          (film?.movie?.release ||
                                              film?.movie?.premiere) ??
                                              '',
                                      ).getFullYear()
                                    : '',
                                ...(film?.genres ?? []),
                            ]
                                ?.filter(Boolean)
                                ?.join(', ')}
                        </div>
                    )}
                </div>
            </article>
        );
    }
}
