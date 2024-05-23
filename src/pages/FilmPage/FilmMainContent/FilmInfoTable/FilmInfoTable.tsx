import styles from './FilmInfoTable.module.scss';

import { Link } from '@/components/Link';
import type { Film, Person } from '@/api/content/types';
import { AppComponent } from '@/core';
import { concatClasses, getHumanDate, isDefined, parseBudget } from '@/utils';
import type { RoutesValues } from '@/App/App.routes';
import { routes } from '@/App/App.routes';
import { AgeLimitBadge } from '@/components/AgeLimitBadge';
import { GENRES_MAP } from '@/shared/constants';

const cx = concatClasses.bind(styles);

export interface FilmInfoTableProps
    extends Omit<
        App.DetailedHTMLProps<
            App.TableHTMLAttributes<HTMLTableElement>,
            HTMLTableElement
        >,
        'children'
    > {
    film?: Film;
}

class NotFound extends AppComponent {
    render() {
        return <div className={cx('not-found')}>Нет информации</div>;
    }
}

const renderLinks = (persons?: { title?: string; link: RoutesValues }[]) =>
    persons?.map(({ title, link }, index) => (
        <span>
            <Link href={link}>{title}</Link>
            {index < (persons?.length ?? 0) - 1 && ', '}
        </span>
    ));

const convertPersonToLink = (person?: Person) => ({
    link: routes.person(person?.id ?? 0),
    title: person?.name ?? '',
});

export class FilmInfoTable extends AppComponent<FilmInfoTableProps> {
    render() {
        const { film, className, ...props } = this.props;

        const producers = film?.producers?.map(convertPersonToLink);
        const directors = film?.directors?.map(convertPersonToLink);
        const writers = film?.writers?.map(convertPersonToLink);
        const operators = film?.operators?.map(convertPersonToLink);
        const composers = film?.composers?.map(convertPersonToLink);
        const editors = film?.editors?.map(convertPersonToLink);

        const genres = film?.genres?.map((genre) => ({
            link: routes.collections(GENRES_MAP[genre]),
            title: genre,
        }));

        return (
            <table className={cx('table', className)} {...props}>
                <tbody>
                    {film?.originalTitle && (
                        <tr>
                            <td className={cx('label')}>
                                Оригинальное название:
                            </td>
                            <td>{film.originalTitle}</td>
                        </tr>
                    )}

                    <tr>
                        <td className={cx('label')}>Страна:</td>
                        <td>
                            {film?.countries?.length ? (
                                film.countries.join(', ')
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Жанры:</td>
                        <td>
                            {film?.genres?.length ? (
                                renderLinks(genres)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Режиссёры:</td>
                        <td>
                            {film?.directors?.length ? (
                                renderLinks(directors)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Сценаристы:</td>
                        <td>
                            {film?.writers?.length ? (
                                renderLinks(writers)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Продюсеры:</td>
                        <td>
                            {film?.producers?.length ? (
                                renderLinks(producers)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Операторы:</td>
                        <td>
                            {film?.operators?.length ? (
                                renderLinks(operators)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Композиторы:</td>
                        <td>
                            {film?.composers?.length ? (
                                renderLinks(composers)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Редакторы:</td>
                        <td>
                            {film?.editors?.length ? (
                                renderLinks(editors)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Слоган:</td>
                        <td>
                            {film?.slogan ? (
                                `«${film?.slogan ?? ''}»`
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Бюджет:</td>
                        <td>
                            {isDefined(film?.budget) ? (
                                parseBudget(film.budget)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Дата премьеры:</td>
                        <td>
                            {film?.movie?.premiere ? (
                                getHumanDate(film?.movie?.premiere)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    {film?.movie?.release && (
                        <tr>
                            <td className={cx('label')}>Дата релиза:</td>
                            <td>{getHumanDate(film?.movie?.release)}</td>
                        </tr>
                    )}
                    <tr>
                        <td className={cx('label')}>Возраст:</td>
                        <td>
                            {isDefined(film?.ageRestriction) ? (
                                <AgeLimitBadge age={film.ageRestriction} />
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Длительность:</td>
                        <td>
                            {film?.movie?.duration ? (
                                `${film?.movie?.duration ?? ''} мин.`
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
