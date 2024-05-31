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
import { DefaultPoster } from '@/components/DefaultPoster';
import { Icon } from '@/components/Icon';
import type { LazyImgProps } from '@/components/LazyImg/LazyImg';

const cx = concatClasses.bind(styles);

export interface FilmCardProps
    extends Omit<
            App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLDivElement>,
                HTMLDivElement
            >,
            'ref' | 'children'
        >,
        Pick<LazyImgProps, 'loading'> {
    filmId?: number;
    film?: Film;
    size?: 'small' | 'large';
    withDeleteButton?: boolean;
    onDeleteClick?: (film?: Film) => void;
    link?: RoutesValues | '';
    withReleaseBadge?: boolean;
}

interface FilmCardState {
    linkRef: App.RefObject<HTMLAnchorElement>;
    handleCardClick: () => void;
}

const getYearFromDate = (date?: string) =>
    date ? new Date(date).getFullYear() : '';

export class FilmCard extends AppComponent<FilmCardProps, FilmCardState> {
    state: FilmCardState = {
        linkRef: { current: null },
        handleCardClick: () => {
            this.state.linkRef.current?.click();
        },
    };

    render() {
        const {
            className,
            film,
            size = 'large',
            withDeleteButton,
            onDeleteClick,
            link = routes.film(film?.id ?? 0),
            withReleaseBadge,
            loading = 'lazy',
            ...props
        } = this.props;

        const showRatingBadge =
            !withReleaseBadge &&
            isDefined(film?.rating) &&
            (!film?.ongoing || !!film.rating);

        const releaseMoveDate = film?.movie?.release;
        const releaseSerialYear = `${film?.series?.yearStart ?? ''}`;

        const releaseDate =
            film?.type === 'movie' ? releaseMoveDate : releaseSerialYear;

        return (
            <div
                {...props}
                className={cx('card', className, {
                    button: !!link,
                })}
                role={link ? 'button' : undefined}
                tabIndex={link ? 0 : -1}
                onClick={this.state.handleCardClick}
                onKeyDown={clickOnEnter}
            >
                <article className={cx('article', { small: size === 'small' })}>
                    <div
                        className={cx('poster', {
                            'full-width': size === 'small',
                            'left-shadow': withDeleteButton,
                        })}
                    >
                        {film?.posterURL ? (
                            <LazyImg
                                loading={loading}
                                src={getStaticUrl(film?.posterURL)}
                                className={cx('poster-img')}
                                alt="Постер"
                                width="136px"
                                height="200px"
                            />
                        ) : (
                            <DefaultPoster
                                className={cx('poster-img')}
                                type="film"
                            />
                        )}
                        {withReleaseBadge && (
                            <ReleaseBadge
                                date={film?.ongoingDate}
                                className={cx('badge')}
                            />
                        )}
                        {showRatingBadge && (
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
                                <Icon icon={icTrashUrl} />
                            </Button>
                        )}
                    </div>
                    <div
                        className={cx('card-info', { small: size === 'small' })}
                    >
                        {link ? (
                            <Link
                                href={link}
                                tabIndex={-1}
                                ref={this.state.linkRef}
                            >
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
                                        getYearFromDate(releaseDate),
                                        film?.movie?.duration
                                            ? `${film?.movie?.duration} мин.`
                                            : '',
                                    ]
                                        .filter(Boolean)
                                        .join(', ')}
                                </span>
                                <span>
                                    <span>
                                        {[
                                            film?.countries?.[0],
                                            film?.genres?.[0],
                                        ]
                                            .filter(Boolean)
                                            .join(' ▸ ')}
                                    </span>
                                    {!!film?.directors?.length && (
                                        <span>
                                            {film?.directors?.[0]
                                                ? `Режиссёр: ${film.directors[0].name ?? ''}`
                                                : ''}
                                        </span>
                                    )}
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
                                    releaseDate
                                        ? new Date(releaseDate).getFullYear()
                                        : '',
                                    ...(film?.genres ?? []),
                                ]
                                    ?.filter(Boolean)
                                    ?.join(', ')}
                            </div>
                        )}
                    </div>
                </article>
            </div>
        );
    }
}
