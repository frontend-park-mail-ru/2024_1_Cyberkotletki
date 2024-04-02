import styles from './FilmsContainer.module.scss';

import type {
    CompilationResponse,
    FilmsGenre,
} from '@/api/collections/service';
import { collectionsService } from '@/api/collections/service';
import { AppComponent } from '@/appCore/src/AppComponent';
import { Button } from '@/components/Button/Button';
import { FilmCard } from '@/components/FilmCard';
import { concatClasses } from '@/utils';

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
}

export class FilmsContainer extends AppComponent<
    FilmsContainerProps,
    FilmsContainerState
> {
    constructor(props: FilmsContainerProps) {
        super(props);

        const getFilmsIdsByGenre = (genre: FilmsGenre) => {
            void collectionsService.getCompilation(genre).then((data) => {
                this.setState((prev) => ({
                    ...prev,
                    // TODO: Убрать JSON.parse когда придет
                    // нормальный Content-Type в ответе
                    filmsIds: (
                        JSON.parse(
                            data as unknown as string,
                        ) as CompilationResponse
                    ).ids,
                }));
            });
        };

        this.state.getFilmsIdsByGenre = getFilmsIdsByGenre;

        this.state.handleAction = () => getFilmsIdsByGenre('action');
        this.state.handleComedian = () => getFilmsIdsByGenre('comedian');
        this.state.handleDrama = () => getFilmsIdsByGenre('drama');
    }

    componentWillMount() {
        this.state.handleAction();
    }

    render() {
        const { className, ...props } = this.props;
        const { filmsIds, handleAction, handleComedian, handleDrama } =
            this.state;

        return (
            <section {...props} className={cx('container', className)}>
                <h1 className={cx('head')}>Специально для вас</h1>
                <div className={cx('categories')}>
                    <Button outlined onClick={handleAction}>
                        Комедия
                    </Button>
                    <Button outlined onClick={handleComedian}>
                        Боевик
                    </Button>
                    <Button outlined onClick={handleDrama}>
                        Драма
                    </Button>
                </div>
                <div className={cx('grid-container')}>
                    {filmsIds?.map((id) => <FilmCard filmId={id} />)}
                </div>
            </section>
        );
    }
}
