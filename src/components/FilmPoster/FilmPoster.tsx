import styles from './FilmPoster.module.scss';

import { LazyImg } from '@/components/LazyImg';
import type { LazyImgProps } from '@/components/LazyImg/LazyImg';
import { AppComponent } from '@/core';
import { concatClasses, getStaticUrl } from '@/utils';

const cx = concatClasses.bind(styles);

export interface FilmPosterProps extends LazyImgProps {
    url?: string;
    posterUrl?: string;
}

export class FilmPoster extends AppComponent<FilmPosterProps> {
    render() {
        const { src, className, ...props } = this.props;

        return (
            <div className={cx('poster-container', className)}>
                <LazyImg
                    className={cx('poster-blur')}
                    src={getStaticUrl(src)}
                    width="300px"
                    height="443px"
                    aria-hidden
                    {...props}
                />
                <LazyImg
                    className={cx('poster')}
                    src={getStaticUrl(src)}
                    width="300px"
                    height="443px"
                    {...props}
                />
            </div>
        );
    }
}
