import styles from './FavouritesPage.module.scss';

import { contentService } from '@/api/content/service';
import type { Film } from '@/api/content/types';
import { favouriteService } from '@/api/favourite/favourite.service';
import type { FavouriteResponse } from '@/api/favourite/favourite.types';
import { FilmCard } from '@/components/FilmCard';
import { Spinner } from '@/components/Spinner';
import { AppComponent } from '@/core';
import { LayoutGrid } from '@/layouts/LayoutGrid';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses, isDefined } from '@/utils';

const cx = concatClasses.bind(styles);

export interface FavouritesPageState {
    favouritesResponse?: FavouriteResponse;
    favouriteContent?: Film[];
    isFirstLoading?: boolean;
}

export class FavouritesPage extends AppComponent<object, FavouritesPageState> {
    loadMyFavourites = async () => {
        const favouritesResponse = await favouriteService.getMyFavourites();

        const favouriteContent = (
            await Promise.all(
                favouritesResponse.favourites?.map(({ contentID }) =>
                    contentService.getFilmById(contentID ?? 0),
                ) ?? [],
            )
        ).filter(Boolean) as Film[];

        this.setState((prev) => ({
            ...prev,
            favouritesResponse,
            favouriteContent,
        }));
    };

    handleDelete = (film?: Film) => {
        if (isDefined(film?.id)) {
            void favouriteService.deleteFavouriteContent(film.id).then(() => {
                void this.loadMyFavourites();
            });
        }
    };

    componentDidMount(): void {
        this.setState((prev) => ({ ...prev, isFirstLoading: true }));
        void this.loadMyFavourites().finally(() => {
            this.setState((prev) => ({ ...prev, isFirstLoading: false }));
        });
    }

    render() {
        const { favouriteContent, isFirstLoading } = this.state;

        return (
            <LayoutWithHeader>
                {isFirstLoading ? (
                    <div className={cx('loader-container')}>
                        <Spinner />
                    </div>
                ) : (
                    <section>
                        <h1 className={cx('head')}>Избранное</h1>
                        <LayoutGrid
                            className={cx('grid-container')}
                            itemsPerRow={6}
                            itemsPerRowMobile={2}
                        >
                            {favouriteContent?.map((film) => (
                                <FilmCard
                                    film={film}
                                    size="small"
                                    withDeleteButton
                                    onDeleteClick={this.handleDelete}
                                />
                            ))}
                        </LayoutGrid>
                    </section>
                )}
            </LayoutWithHeader>
        );
    }
}
