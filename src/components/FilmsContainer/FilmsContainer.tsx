import styles from './FilmsContainer.module.scss';

import type { FilmsGenre } from '@/api/collections/service';
import { AppComponent } from '@/core';
import { FilmCard } from '@/components/FilmCard';
import { concatClasses } from '@/utils';
import type { Film } from '@/api/content/types';
import { ContentContext } from '@/Providers/ContentProvider';
import type { AppContext } from '@/types/Context.types';
import { Spinner } from '@/components/Spinner';
import { LayoutGrid } from '@/layouts/LayoutGrid';

const cx = concatClasses.bind(styles);

export interface FilmsContainerProps
    extends Omit<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
        'ref' | 'children'
    > {
    context?: AppContext;
}

export interface FilmsContainerState {
    getFilmsIdsByGenre: (genre: FilmsGenre) => void;
    handleComedian: () => void;
    handleAction: () => void;
    handleDrama: () => void;
    films?: Film[];
    isLoading?: boolean;
    isError?: boolean;
}

class FilmsContainerClass extends AppComponent<
    FilmsContainerProps,
    FilmsContainerState
> {
    loadAllFilms = () => {
        const { context } = this.props;
        const { isLoading, films, isError } = this.state;

        if (
            !context?.content?.films?.length &&
            !films?.length &&
            !isLoading &&
            !isError
        ) {
            this.setState((prev) => ({
                ...prev,
                isLoading: true,
            }));

            void context?.content
                ?.getAllFilms?.()
                .then((films) => {
                    this.setState((prev) => ({
                        ...prev,
                        films,
                    }));
                })
                .catch(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isError: true,
                    }));
                })
                .finally(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isLoading: false,
                    }));
                });
        }
    };

    render() {
        this.loadAllFilms();

        const { className, context, ...props } = this.props;
        const { films: stateFilms, isLoading } = this.state;

        const films = context?.content?.films || stateFilms;

        return (
            <section {...props} className={cx('container', className)}>
                <h1 className={cx('head')}>Подборка лучших фильмов</h1>
                {isLoading ? (
                    <div className={cx('spinner-container')}>
                        <Spinner />
                    </div>
                ) : (
                    <LayoutGrid className={cx('grid-container')}>
                        {films?.map((film) => <FilmCard film={film} />)}
                    </LayoutGrid>
                )}
            </section>
        );
    }
}

export const FilmsContainer = ContentContext.Connect(FilmsContainerClass);
