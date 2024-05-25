import styles from './SimilarContentBlock.module.scss';

import { FilmCard } from '@/components/FilmCard';
import type { Film, SimilarContent } from '@/api/content/types';
import { AppComponent } from '@/core';
import type { HTMLElementProps } from '@/types/HTMLElementProps.types';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { concatClasses, convertSimilarToFilm } from '@/utils';
import { Carousel } from '@/components/Carousel/Carousel';

const cx = concatClasses.bind(styles);

export interface SimilarContentBlockProps
    extends OmitChildren<HTMLElementProps> {
    className?: string;
    similarContent?: SimilarContent[];
}

interface SimilarContentBlockState {
    expanded?: boolean;
    films?: Film[];
}

export class SimilarContentBlock extends AppComponent<
    SimilarContentBlockProps,
    SimilarContentBlockState
> {
    state: SimilarContentBlockState = {
        films: this.props.similarContent?.map(convertSimilarToFilm),
    };

    componentDidUpdate(
        _: SimilarContentBlockState | null,
        prevProps: SimilarContentBlockProps | null,
    ): void {
        if (prevProps?.similarContent !== this.props.similarContent) {
            this.setState((prev) => ({
                ...prev,
                films: this.props.similarContent?.map(convertSimilarToFilm),
            }));
        }
    }

    render() {
        const { className, ...props } = this.props;
        const { films } = this.state;

        return (
            <section className={cx('list', className)} {...props}>
                <h1>Похожее:</h1>
                <Carousel
                    itemsPerView={6}
                    itemsPerViewMobile={2}
                    itemsPerViewTablet={4}
                >
                    {films?.map((film) => (
                        <div className={cx('card')}>
                            <FilmCard film={film} size="small" />
                        </div>
                    ))}
                </Carousel>
            </section>
        );
    }
}
