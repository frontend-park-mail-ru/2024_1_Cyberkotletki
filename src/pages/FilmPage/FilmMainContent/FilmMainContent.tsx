import styles from './FilmMainContent.module.scss';

import { routes } from '@/App/App.routes';
import type { Film } from '@/api/content/types';
import { icBellUrl, icStarOutlinedUrl } from '@/assets/icons';
import { Button } from '@/components/Button';
import { FilmPoster } from '@/components/FilmPoster';
import { Icon } from '@/components/Icon';
import { LazyImg } from '@/components/LazyImg';
import { Link } from '@/components/Link';
import { Rating } from '@/components/Rating';
import { YouTubeIframe } from '@/components/YouTubeIframe';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { FilmInfoTable } from '@/pages/FilmPage/FilmMainContent/FilmInfoTable';
import { REVIEW_FORM_ID } from '@/pages/FilmPage/FilmPage';
import { concatClasses, getStaticUrl } from '@/utils';

const cx = concatClasses.bind(styles);

export interface FilmMainContentProps {
    film?: Film;
    onFavouriteClick?: (film?: Film) => void;
    addedToFavourite?: boolean;
    withFavButton?: boolean;
    withBellButton?: boolean;
    onBellClick?: (film?: Film) => void;
    subscribed?: boolean;
}

export interface FilmMainContentState {
    backdropRef: App.RefObject<HTMLDivElement>;
}

export const scrollToReviewForm = () => {
    document.getElementById(REVIEW_FORM_ID)?.scrollIntoView({
        behavior: 'smooth',
    });
};

interface BackdropProps {
    src?: string;
}

interface BackdropState {
    backdropRef: App.RefObject<HTMLDivElement>;
}

class Backdrop extends AppComponent<BackdropProps, BackdropState> {
    state: BackdropState = { backdropRef: { current: null } };

    loaded = false;

    handleLoad = () => {
        if (this.state.backdropRef.current && !this.loaded) {
            this.state.backdropRef.current.classList.add(cx('loaded'));
            this.state.backdropRef.current.style.backgroundImage = `url("${getStaticUrl(this.props.src)}")`;
        }

        this.loaded = true;
    };

    componentShouldUpdate(newConfig: BackdropProps | null): boolean {
        return newConfig?.src !== this.props.src;
    }

    render(): AppNode {
        const { src } = this.props;

        return (
            <div ref={this.state.backdropRef} className={cx('backdrop')}>
                <LazyImg
                    style="position:fixed; visibility:hidden; width:0; height:0;top:-1px;left-1px"
                    src={getStaticUrl(src)}
                    onLoad={this.handleLoad}
                    aria-hidden
                />
            </div>
        );
    }
}

export class FilmMainContent extends AppComponent<
    FilmMainContentProps,
    FilmMainContentState
> {
    state: FilmMainContentState = { backdropRef: { current: null } };

    setBackdropImage = () => {
        if (this.state.backdropRef.current) {
            this.state.backdropRef.current.style.backgroundImage = `url("${getStaticUrl(this.props.film?.backdropURL || this.props.film?.posterURL)}")`;
        }
    };

    componentDidMount() {
        this.setBackdropImage();
    }

    componentDidUpdate(
        _: object | null,
        prevProps: FilmMainContentProps | null,
    ) {
        if (prevProps?.film !== this.props.film) {
            this.setBackdropImage();
        }
    }

    render() {
        const {
            film,
            onFavouriteClick,
            addedToFavourite,
            withFavButton,
            withBellButton,
            onBellClick,
            subscribed,
        } = this.props;

        const showRatingBlock = !film?.ongoing;

        const subTitle = film?.type === 'movie' ? 'фильм' : 'сериал';

        return (
            <div className={cx('content')}>
                {(film?.backdropURL || film?.posterURL) && (
                    <Backdrop src={film?.backdropURL || film?.posterURL} />
                )}
                <div className={cx('left-container')}>
                    <FilmPoster
                        src={film?.posterURL}
                        alt={film?.title}
                        className={cx('film-poster')}
                        loading="eager"
                    />
                    <h1 className={cx('title', 'hide-on-desktop')}>
                        {film?.title} {subTitle}
                    </h1>
                    <p className={cx('subtitle', 'hide-on-desktop')}>
                        {subTitle}
                    </p>
                    {(withFavButton || withBellButton) && (
                        <div className={cx('buttons-container')}>
                            {withFavButton && (
                                <Button
                                    outlined
                                    styleType="secondary"
                                    onClick={() => {
                                        onFavouriteClick?.(film);
                                    }}
                                    className={cx('fav-button', {
                                        added: addedToFavourite,
                                    })}
                                >
                                    <Icon
                                        icon={icStarOutlinedUrl}
                                        className={cx('icon', {
                                            added: addedToFavourite,
                                        })}
                                    />
                                    {addedToFavourite
                                        ? 'в избранном'
                                        : 'добавить в избранное'}
                                </Button>
                            )}
                            {withBellButton && (
                                <Button
                                    isIconOnly
                                    styleType="secondary"
                                    outlined
                                    className={cx('bell-button', {
                                        subscribed,
                                    })}
                                    title="Уведомить о выходе релиза"
                                    onClick={() => {
                                        onBellClick?.(film);
                                    }}
                                >
                                    <Icon
                                        icon={icBellUrl}
                                        className={cx('bell-icon')}
                                    />
                                    <div className="hide-on-desktop">
                                        Уведомить о выходе релиза
                                    </div>
                                </Button>
                            )}
                        </div>
                    )}

                    {film?.trailerLink && (
                        <section>
                            <YouTubeIframe
                                src={film.trailerLink}
                                className={cx('player-iframe')}
                                title={`youtube плеер дла фильма ${film?.title ?? ''}`}
                            />
                            <h2 className={cx('trailer-title')}>Трейлер</h2>
                        </section>
                    )}
                </div>
                <div className={cx('section')}>
                    <div className={cx('top-info')}>
                        <section>
                            <h1 className={cx('title', 'hide-on-mobile')}>
                                {film?.title}
                            </h1>
                            <p className={cx('subtitle', 'hide-on-mobile')}>
                                {subTitle}
                            </p>
                            <FilmInfoTable
                                film={film}
                                className={cx('info-table')}
                            />
                        </section>
                        <div className={cx('right-container')}>
                            {showRatingBlock && (
                                <div className={cx('rating-container')}>
                                    <Rating
                                        rating={film?.rating}
                                        imdbRating={film?.imdbRating}
                                    />
                                    <Button onClick={scrollToReviewForm}>
                                        Оценить
                                    </Button>
                                </div>
                            )}
                            {!!film?.actors?.length && (
                                <section className={cx('roles-section')}>
                                    <h1>В главных ролях:</h1>
                                    <ul>
                                        {film?.actors?.map(({ name, id }) => (
                                            <li>
                                                <Link
                                                    href={routes.person(
                                                        id ?? 0,
                                                    )}
                                                >
                                                    {name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    </div>
                    <section className={cx('description-section')}>
                        <h1>Описание</h1>
                        <p title={film?.description}>{film?.description}</p>
                    </section>
                </div>
            </div>
        );
    }
}
