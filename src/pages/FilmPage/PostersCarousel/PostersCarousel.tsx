import styles from './PostersCarousel.module.scss';

import type { Film } from '@/api/content/types';
import { AppComponent } from '@/core';
import type { HTMLElementProps } from '@/types/HTMLElementProps.types';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { concatClasses, getStaticUrl } from '@/utils';
import { Carousel } from '@/components/Carousel/Carousel';
import { LazyImg } from '@/components/LazyImg';

const cx = concatClasses.bind(styles);

export interface PostersCarouselProps extends OmitChildren<HTMLElementProps> {
    pictures?: string[];
}

interface PostersCarouselState {
    expanded?: boolean;
    films?: Film[];
}

export class PostersCarousel extends AppComponent<
    PostersCarouselProps,
    PostersCarouselState
> {
    render() {
        const { className, pictures, ...props } = this.props;

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
                            />
                        </div>
                    ))}
                </Carousel>
            </section>
        );
    }
}
