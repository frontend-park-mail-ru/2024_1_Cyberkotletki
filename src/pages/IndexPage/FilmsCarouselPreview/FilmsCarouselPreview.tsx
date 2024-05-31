import styles from './FilmsCarouselPreview.module.scss';

import { routes } from '@/App/App.routes';
import type { Film } from '@/api/content/types';
import { Carousel } from '@/components/Carousel';
import type { CarouselProps } from '@/components/Carousel/Carousel';
import { FilmCard } from '@/components/FilmCard';
import type { FilmCardProps } from '@/components/FilmCard/FilmCard';
import type { LazyImgProps } from '@/components/LazyImg/LazyImg';
import { Spinner } from '@/components/Spinner';
import { VisibleObserver } from '@/components/VisibleObserver';
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
        Pick<LazyImgProps, 'loading'> {
    films?: Film[];
    isLoading?: boolean;
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
            isLoading,
            loading,
            ...props
        } = this.props;

        const defaultLength = (this.props.itemsPerView ?? 0) + 1;

        return (
            <VisibleObserver className={cx(className)}>
                <LayoutPreview
                    className={cx('container', className, {
                        loading: isLoading,
                    })}
                    title={title}
                    moreTitle={moreTitle}
                    moreLink={moreLink}
                >
                    <Carousel {...props}>
                        {isLoading
                            ? Array.from(
                                  {
                                      length: defaultLength,
                                  },
                                  () => (
                                      <div className={cx('card', 'skeleton')}>
                                          <div
                                              className={cx('skeleton-poster')}
                                          >
                                              <Spinner />
                                          </div>
                                      </div>
                                  ),
                              )
                            : films?.map((film, index) => (
                                  <div className={cx('card')}>
                                      <FilmCard
                                          film={film}
                                          size={size}
                                          link={routes.film(film.id ?? 0)}
                                          withDeleteButton={withDeleteButton}
                                          withReleaseBadge={withReleaseBadge}
                                          loading={
                                              index <
                                                  (props.itemsPerView ?? 0) &&
                                              loading === 'eager'
                                                  ? 'eager'
                                                  : 'lazy'
                                          }
                                      />
                                  </div>
                              ))}
                    </Carousel>
                </LayoutPreview>
            </VisibleObserver>
        );
    }
}
