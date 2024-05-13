import styles from './FilmMainContent.module.scss';

import { routes } from '@/App/App.routes';
import type { Film } from '@/api/content/types';
import { icStarFilledUrl, icStarOutlinedUrl } from '@/assets/icons';
import { Button } from '@/components/Button';
import { FilmPoster } from '@/components/FilmPoster';
import { Link } from '@/components/Link';
import { Rating } from '@/components/Rating';
import { AppComponent } from '@/core';
import { FilmInfoTable } from '@/pages/FilmPage/FilmMainContent/FilmInfoTable';
import { REVIEW_FORM_ID } from '@/pages/FilmPage/FilmPage';
import { concatClasses, getStaticUrl } from '@/utils';

const cx = concatClasses.bind(styles);

export interface FilmMainContentProps {
    film?: Film;
    onFavouriteClick?: (film?: Film) => void;
    addedToFavourite?: boolean;
    withFavButton?: boolean;
}

export interface FilmMainContentState {
    backdropRef: App.RefObject<HTMLDivElement>;
}

const scrollToReviewForm = () => {
    document.getElementById(REVIEW_FORM_ID)?.scrollIntoView({
        behavior: 'smooth',
    });
};

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
        const { film, onFavouriteClick, addedToFavourite, withFavButton } =
            this.props;

        return (
            <div className={cx('content')}>
                <div ref={this.state.backdropRef} className={cx('backdrop')} />
                <div className={cx('left-container')}>
                    <FilmPoster
                        src={film?.posterURL}
                        alt={film?.title}
                        className={cx('film-poster')}
                        loading="eager"
                    />
                    <h1 className={cx('title', 'hide-on-desktop')}>
                        {film?.title}
                    </h1>
                    {withFavButton && (
                        <Button
                            outlined
                            styleType="secondary"
                            onClick={() => {
                                onFavouriteClick?.(film);
                            }}
                            className={cx('fav-button')}
                        >
                            {addedToFavourite ? (
                                <img src={icStarFilledUrl} aria-hidden />
                            ) : (
                                <img src={icStarOutlinedUrl} aria-hidden />
                            )}
                            {addedToFavourite ? 'В избранном' : 'В избранное'}
                        </Button>
                    )}
                </div>
                <div className={cx('section')}>
                    <div className={cx('top-info')}>
                        <section>
                            <h1 className={cx('title', 'hide-on-mobile')}>
                                {film?.title}
                            </h1>
                            <FilmInfoTable
                                film={film}
                                className={cx('info-table')}
                            />
                        </section>
                        <div className={cx('right-container')}>
                            <div className={cx('rating-container')}>
                                <Rating
                                    rating={film?.rating}
                                    imdbRating={film?.imdbRating}
                                />
                                <Button onClick={scrollToReviewForm}>
                                    Оценить
                                </Button>
                            </div>
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
