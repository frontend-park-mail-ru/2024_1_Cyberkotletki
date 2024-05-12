import styles from './FilmInfoTable.module.scss';

import { Link } from '@/components/Link';
import type { Film, Person } from '@/api/content/types';
import { AppComponent } from '@/core';
import { concatClasses, getHumanDate, isDefined } from '@/utils';
import { routes } from '@/App/App.routes';

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

export class FilmInfoTable extends AppComponent<FilmInfoTableProps> {
    renderPersons = (persons: Person[]) =>
        persons.map((person, index) => (
            <span>
                <Link
                    href={routes.person(`${person.id ?? 0}`)}
                >{`${person.name ?? ''}`}</Link>
                {index < persons.length - 1 && ', '}
            </span>
        ));

    render() {
        const { film, className, ...props } = this.props;

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
                                film.genres.join(', ')
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Режиссеры:</td>
                        <td>
                            {film?.directors?.length ? (
                                this.renderPersons(film?.directors)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Сценаристы:</td>
                        <td>
                            {film?.writers?.length ? (
                                this.renderPersons(film.writers)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Продюсеры:</td>
                        <td>
                            {film?.producers?.length ? (
                                this.renderPersons(film.producers)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Операторы:</td>
                        <td>
                            {film?.operators?.length ? (
                                this.renderPersons(film.operators)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Композиторы:</td>
                        <td>
                            {film?.composers?.length ? (
                                this.renderPersons(film.composers)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Редакторы:</td>
                        <td>
                            {film?.editors?.length ? (
                                this.renderPersons(film.editors)
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Слоган:</td>
                        <td>
                            {film?.slogan ? (
                                `"${film?.slogan ?? ''}"`
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Бюджет:</td>
                        <td>
                            {isDefined(film?.budget) ? (
                                film.budget
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    {film?.movie?.premiere ? (
                        <tr>
                            <td className={cx('label')}>Дата премьеры:</td>
                            <td>{getHumanDate(film?.movie?.premiere)}</td>
                        </tr>
                    ) : (
                        <NotFound />
                    )}
                    {film?.movie?.release && (
                        <tr>
                            <td className={cx('label')}>Дата релиза:</td>
                            <td>{getHumanDate(film?.movie?.release)}</td>
                        </tr>
                    )}
                    <tr>
                        <td className={cx('label')}>Возрастное ограничение:</td>
                        <td>
                            {isDefined(film?.ageRestriction) ? (
                                `${film?.ageRestriction ?? ''}+`
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
