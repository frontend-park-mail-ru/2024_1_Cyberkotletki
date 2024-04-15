import styles from './FilmsContainer.module.scss';

import type { FilmsGenre } from '@/api/collections/service';
import { AppComponent } from '@/core';
import { FilmCard } from '@/components/FilmCard';
import { concatClasses } from '@/utils';
import { contentService } from '@/api/content/service';
import type { Film } from '@/api/content/types';

const cx = concatClasses.bind(styles);

export interface FilmsContainerProps
    extends Omit<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
        'ref' | 'children'
    > {
    filmsIds?: number[];
}

export interface FilmsContainerState {
    filmsIds?: number[];
    getFilmsIdsByGenre: (genre: FilmsGenre) => void;
    handleComedian: () => void;
    handleAction: () => void;
    handleDrama: () => void;
    films: Film[];
}

export class FilmsContainer extends AppComponent<
    FilmsContainerProps,
    FilmsContainerState
> {
    componentDidMount(): void {
        void contentService.getAllFilms().then((films) => {
            this.setState((prev) => ({
                ...prev,
                films: films.filter(Boolean) as Film[],
            }));
        });
    }

    render() {
        const { className, ...props } = this.props;
        const { films } = this.state;

        return (
            <section {...props} className={cx('container', className)}>
                <h1 className={cx('head')}>Подборка лучших фильмов</h1>
                <div className={cx('grid-container')}>
                    {films?.map((film) => <FilmCard film={film} />)}
                </div>
            </section>
        );
    }
}
