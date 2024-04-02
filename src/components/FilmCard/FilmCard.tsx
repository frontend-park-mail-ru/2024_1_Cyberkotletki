import styles from './FilmCard.module.scss';

import type { PreviewContentCard } from '@/api/content/service';
import { contentService } from '@/api/content/service';
import { AppComponent } from '@/appCore/src/AppComponent';
import { RatingBadge } from '@/components/RatingBadge';
import { Config } from '@/shared/constants';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface FilmCardProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref' | 'children'
    > {
    filmId?: number;
}

export interface FilmCardState {
    loaded?: boolean;
    film?: PreviewContentCard;
    getPreviewContentCard: (id: number) => void;
}

export class FilmCard extends AppComponent<FilmCardProps, FilmCardState> {
    constructor(props: FilmCardProps) {
        super(props);
        this.state.getPreviewContentCard = (id) => {
            void contentService.getPreviewContentCard(id).then((data) => {
                this.setState((prev) => ({
                    ...prev,
                    loaded: true,
                    // TODO: Убрать JSON.parse когда придет
                    // нормальный Content-Type в ответе
                    film: JSON.parse(
                        data as unknown as string,
                    ) as PreviewContentCard,
                }));
            });
        };
    }

    componentWillMount() {
        this.state.getPreviewContentCard(this.props.filmId ?? 0);
    }

    componentDidUpdate(_: unknown, prevProps: FilmCardProps | null): void {
        if (prevProps?.filmId !== this.props.filmId) {
            this.state.getPreviewContentCard(this.props.filmId ?? 0);
        }
    }

    render() {
        const { className, ...props } = this.props;
        const { loaded, film } = this.state;

        return (
            <div {...props} className={cx('card', className)}>
                {loaded && (
                    <div className={cx('poster')}>
                        <RatingBadge rating={film?.rating} />
                        <img
                            src={`${Config.BACKEND_URL}/static/${film?.poster ?? ''}`}
                            alt="Постер"
                        />
                    </div>
                )}
                {loaded && (
                    <article className={cx('card-info')}>
                        <h1>{film?.title}</h1>
                        <span>
                            {[
                                film?.original_title || film?.title,
                                film?.release_year,
                                `${film?.duration ?? '0'} мин.`,
                            ]
                                .filter(Boolean)
                                .join(', ')}
                        </span>
                        <span>
                            {[
                                film?.country,
                                film?.genre,
                                film?.director
                                    ? `Режиссёр: ${film?.director}`
                                    : '',
                            ]
                                .filter(Boolean)
                                .join(' ▸ ')}
                        </span>
                        {!!film?.actors.length && (
                            <span>{`В ролях: ${film.actors.join(', ')}`}</span>
                        )}
                    </article>
                )}
            </div>
        );
    }
}
