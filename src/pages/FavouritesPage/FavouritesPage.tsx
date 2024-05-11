import styles from './FavouritesPage.module.scss';

import { ContentContext } from '@/Providers/ContentProvider';
import type { Film } from '@/api/content/types';
import { favouriteService } from '@/api/favourite/favourite.service';
import { FilmCard } from '@/components/FilmCard';
import { Spinner } from '@/components/Spinner';
import { AppComponent } from '@/core';
import { LayoutGrid } from '@/layouts/LayoutGrid';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses, isDefined } from '@/utils';
import type { AppContextComponentProps } from '@/types/Context.types';

const cx = concatClasses.bind(styles);

export interface FavouritesPageState {
    favouriteContent?: Film[];
    isFirstLoading?: boolean;
}

class FavouritesPageInner extends AppComponent<
    AppContextComponentProps,
    FavouritesPageState
> {
    loadMyFavourites = async () => {
        await this.props.context?.content
            ?.loadFavouriteFilms?.()
            .then((films) => {
                this.setState((prev) => ({
                    ...prev,
                    favouriteContent: films,
                }));
            });
    };

    handleDelete = (film?: Film) => {
        if (isDefined(film?.id)) {
            void favouriteService.deleteFavouriteContent(film.id).then(() => {
                void this.loadMyFavourites();
            });
        }
    };

    componentDidMount(): void {
        const favouriteFilms = this.props.context?.content?.favouriteFilms;

        if (!favouriteFilms) {
            this.setState((prev) => ({ ...prev, isFirstLoading: true }));

            void this.loadMyFavourites().finally(() => {
                this.setState((prev) => ({ ...prev, isFirstLoading: false }));
            });
        }
    }

    render() {
        const { isFirstLoading } = this.state;

        const favouriteContent =
            this.props.context?.content?.favouriteFilms ||
            this.state.favouriteContent;

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
                            {favouriteContent?.length ? (
                                favouriteContent?.map((film) => (
                                    <FilmCard
                                        film={film}
                                        size="small"
                                        withDeleteButton
                                        onDeleteClick={this.handleDelete}
                                    />
                                ))
                            ) : (
                                <p>Здесь пока ничего нет</p>
                            )}
                        </LayoutGrid>
                    </section>
                )}
            </LayoutWithHeader>
        );
    }
}

class FavouritesPageClass extends AppComponent<AppContextComponentProps> {
    render() {
        return <FavouritesPageInner context={this.props.context} />;
    }
}

export const FavouritesPage = ContentContext.Connect(FavouritesPageClass);
