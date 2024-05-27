import styles from './FilmsCarouselPreview.module.scss';

import { routes } from '@/App/App.routes';
import type { Film } from '@/api/content/types';
import { Carousel } from '@/components/Carousel';
import type { CarouselProps } from '@/components/Carousel/Carousel';
import { FilmCard } from '@/components/FilmCard';
import type { FilmCardProps } from '@/components/FilmCard/FilmCard';
import { VisibleObserver } from '@/components/VisibleObserver';
import type { VisibleObserverProps } from '@/components/VisibleObserver/VisibleObserver';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutPreview } from '@/layouts/LayoutPreview';
import type { LayoutPreviewProps } from '@/layouts/LayoutPreview/LayoutPreview';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface FilmsCarouselPreviewProps
    extends Omit<OmitChildren<CarouselProps>, 'ref'>,
        Pick<LayoutPreviewProps, 'title' | 'moreLink' | 'moreTitle'>,
        Pick<FilmCardProps, 'size' | 'withDeleteButton' | 'withReleaseBadge'>,
        Pick<VisibleObserverProps, 'fadeInDelay' | 'fadeInDuration'> {
    films?: Film[];
}

export class FilmsCarouselPreview extends AppComponent<
    FilmsCarouselPreviewProps,
    object
> {
    render(): AppNode {
        const {
            films,
            className,
            title,
            moreLink,
            moreTitle,
            size = 'small',
            withDeleteButton,
            withReleaseBadge,
            fadeInDelay,
            fadeInDuration,
            ...props
        } = this.props;

        return (
            <VisibleObserver
                className={cx(className)}
                fadeInDelay={fadeInDelay}
                fadeInDuration={fadeInDuration}
            >
                <LayoutPreview
                    className={cx('container')}
                    title={title}
                    moreTitle={moreTitle}
                    moreLink={moreLink}
                >
                    <Carousel {...props}>
                        {films?.map((film) => (
                            <div className={cx('card')}>
                                <FilmCard
                                    film={film}
                                    size={size}
                                    link={routes.film(film.id ?? 0)}
                                    withDeleteButton={withDeleteButton}
                                    withReleaseBadge={withReleaseBadge}
                                />
                            </div>
                        ))}
                    </Carousel>
                </LayoutPreview>
            </VisibleObserver>
        );
    }
}
