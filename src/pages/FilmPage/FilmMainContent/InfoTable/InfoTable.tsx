import styles from './InfoTable.module.scss';

import { Link } from '@/components/Link';
import type { Film, Person } from '@/api/content/types';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses, getHumanDate, isDefined } from '@/utils';
import { routes } from '@/App/App.routes';

const cx = concatClasses.bind(styles);

export interface InfoTableProps {
    film?: Film;
}

class NotFound extends AppComponent {
    render() {
        return <div className={cx('not-found')}>Нет информации</div>;
    }
}

export class InfoTable extends AppComponent<InfoTableProps> {
    renderPersons = (persons: Person[]) =>
        persons.map((person, index) => (
            <span>
                <Link
                    href={routes.person(`${person.id ?? 0}`)}
                >{`${person.name ?? ''}`}</Link>
                {index < persons.length - 1 && ', '}
            </span>
        ));

    render(): AppNode {
        const { film } = this.props;

        return (
            <table className={cx('table')}>
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
                        <td className={cx('label')}>В главных ролях:</td>
                        <td>
                            {film?.actors?.length ? (
                                this.renderPersons(film.actors)
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
                        <td>{`"${film?.slogan ?? ''}"`}</td>
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
                    <tr>
                        <td className={cx('label')}>Зрители:</td>
                        <td>
                            {isDefined(film?.audience) ? (
                                film?.audience
                            ) : (
                                <NotFound />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Дата премьеры:</td>
                        <td>{getHumanDate(film?.movie?.premiere)}</td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Дата релиза:</td>
                        <td>{getHumanDate(film?.movie?.release)}</td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Возрастное ограничение:</td>
                        <td>{`${film?.ageRestriction ?? ''}+`}</td>
                    </tr>
                    <tr>
                        <td className={cx('label')}>Длительность:</td>
                        <td>{`${film?.movie?.duration ?? ''} мин.`}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
