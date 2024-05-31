import styles from './PostersCarousel.module.scss';

import type { ContentType } from '@/api/content/types';
import { AppComponent } from '@/core';
import type { HTMLElementProps } from '@/types/HTMLElementProps.types';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { concatClasses, getStaticUrl } from '@/utils';
import { Carousel } from '@/components/Carousel/Carousel';
import { LazyImg } from '@/components/LazyImg';

const cx = concatClasses.bind(styles);

export interface PostersCarouselProps extends OmitChildren<HTMLElementProps> {
    pictures?: string[];
    filmTitle?: string;
    type?: ContentType;
}

export class PostersCarousel extends AppComponent<PostersCarouselProps> {
    render() {
        const { className, pictures, filmTitle, type, ...props } = this.props;

        return (
            <section className={cx('list', className)} {...props}>
                <h1 hidden>Кадры из фильма</h1>
                <Carousel
                    itemsPerView={1}
                    itemsPerViewMobile={1}
                    itemsPerViewTablet={1}
                    className={cx('carousel')}
                >
                    {pictures?.map((picture) => (
                        <div className={cx('card')}>
                            <LazyImg
                                src={getStaticUrl(picture)}
                                className={cx('image')}
                                alt={`Кадр из ${type === 'movie' ? 'фильма' : 'сериала'} ${filmTitle ?? ''}`}
                            />
                        </div>
                    ))}
                </Carousel>
            </section>
        );
    }
}
