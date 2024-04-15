import styles from './FilmMainContent.module.scss';

import type { Film } from '@/api/content/types';
import { Button } from '@/components/Button';
import { LazyImg } from '@/components/LazyImg';
import { Rating } from '@/components/Rating';
import { AppComponent } from '@/core';
import { InfoTable } from '@/pages/FilmPage/FilmMainContent/InfoTable/InfoTable';
import { concatClasses, getStaticUrl } from '@/utils';

const cx = concatClasses.bind(styles);

export interface FilmMainContentProps {
    film?: Film;
}

export class FilmMainContent extends AppComponent<FilmMainContentProps> {
    render() {
        const { film } = this.props;

        return (
            <div className={cx('content')}>
                <LazyImg
                    className={cx('film-poster')}
                    src={getStaticUrl(film?.posterURL)}
                    width="232px"
                    height="330px"
                />
                <div className={cx('section')}>
                    <div className={cx('top-info')}>
                        <section>
                            <h1 className={cx('title')}>{film?.title}</h1>
                            <InfoTable film={film} />
                        </section>
                        <section className={cx('rating-section')}>
                            <Rating
                                rating={film?.rating}
                                imdbRating={film?.imdbRating}
                            />
                            <a href="#write-review">
                                <Button outlined>Оценить</Button>
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
