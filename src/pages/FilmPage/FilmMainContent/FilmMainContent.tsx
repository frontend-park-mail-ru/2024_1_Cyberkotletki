import styles from './FilmMainContent.module.scss';

import type { Film } from '@/api/content/types';
import { icStarFilledUrl, icStarOutlinedUrl } from '@/assets/icons';
import { Button } from '@/components/Button';
import { LazyImg } from '@/components/LazyImg';
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

export class FilmMainContent extends AppComponent<FilmMainContentProps> {
    render() {
        const { film, onFavouriteClick, addedToFavourite, withFavButton } =
            this.props;

        return (
            <div className={cx('content')}>
                <div>
                    <LazyImg
                        className={cx('film-poster')}
                        src={getStaticUrl(film?.posterURL)}
                        width="232px"
                        height="347px"
                        alt={film?.title}
                    />
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
                            <h1 className={cx('title')}>{film?.title}</h1>
                            <FilmInfoTable film={film} />
                        </section>
                        <section className={cx('rating-section')}>
                            <Rating
                                rating={film?.rating}
                                imdbRating={film?.imdbRating}
                            />
                            <a href={`#${REVIEW_FORM_ID}`}>
                                <Button outlined styleType="secondary">
                                    Оценить
                                </Button>
                            </a>
                        </section>
                    </div>
                    <section className={cx('description-section')}>
                        <h1>Описание</h1>
                        <p>{film?.description}</p>
                    </section>
                </div>
            </div>
        );
    }
}
