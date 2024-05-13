import styles from './FilmCard.module.scss';

import { AppComponent } from '@/core';
import { RatingBadge } from '@/components/RatingBadge';
import { clickOnEnter, concatClasses, getStaticUrl, isDefined } from '@/utils';
import type { Film } from '@/api/content/types';
import { LazyImg } from '@/components/LazyImg';
import { Link } from '@/components/Link';
import { routes, type RoutesValues } from '@/App/App.routes';
import { Button } from '@/components/Button';
import { icTrashUrl } from '@/assets/icons';
import { ReleaseBadge } from '@/components/ReleaseBadge';

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
    link?: RoutesValues | '';
    withReleaseBadge?: boolean;
}

const getYearFromDate = (date?: string) =>
    date ? new Date(date).getFullYear() : '';

export class FilmCard extends AppComponent<FilmCardProps> {
    linkRef: App.RefObject<HTMLAnchorElement> = { current: null };

    render() {
        const {
            className,
            film,
            size = 'large',
            withDeleteButton,
            onDeleteClick,
            link = routes.film(film?.id ?? 0),
            withReleaseBadge,
            ...props
        } = this.props;

        return (
            <article
                {...props}
                className={cx('card', { small: size === 'small' }, className, {
                    button: !!link,
                })}
                role={link ? 'button' : undefined}
                tabIndex={link ? 0 : -1}
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
                    <LazyImg
                        src={getStaticUrl(film?.posterURL)}
                        className={cx('poster-img')}
                        alt="Постер"
                        width="136px"
                        height="200px"
                    />
                    {withReleaseBadge && (
                        <ReleaseBadge
                            date={film?.movie?.release}
                            className={cx('badge')}
                        />
                    )}
                    {!withReleaseBadge && isDefined(film?.rating) && (
                        <RatingBadge
                            rating={film?.rating}
                            className={cx('badge')}
                        />
                    )}
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
                    {link ? (
                        <Link href={link} tabIndex={-1} ref={this.linkRef}>
                            <h1 className={cx('title')} title={film?.title}>
                                {film?.title}
                            </h1>
                        </Link>
                    ) : (
                        <h1 className={cx('title')} title={film?.title}>
                            {film?.title}
                        </h1>
                    )}
                    {size === 'large' ? (
                        <div className={cx('info')}>
                            <span className={cx('bright')}>
                                {[
                                    film?.originalTitle || '',
                                    getYearFromDate(
                                        film?.movie?.release ||
                                            film?.movie?.premiere,
                                    ),
                                    film?.movie?.duration
                                        ? `${film?.movie?.duration} мин.`
                                        : '',
                                ]
                                    .filter(Boolean)
                                    .join(', ')}
                            </span>
                            <span>
                                <span>
                                    {[film?.countries?.[0], film?.genres?.[0]]
                                        .filter(Boolean)
                                        .join(' ▸ ')}
                                </span>
                                <span>
                                    {film?.directors?.[0]
                                        ? `Режиссёр: ${film.directors[0].name ?? ''}`
                                        : ''}
                                </span>
                            </span>
                            {!!film?.actors?.length && (
                                <span>{`В ролях: ${film.actors
                                    .slice(0, 3)
                                    .map((actor) => actor.name)
                                    .join(', ')}`}</span>
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
