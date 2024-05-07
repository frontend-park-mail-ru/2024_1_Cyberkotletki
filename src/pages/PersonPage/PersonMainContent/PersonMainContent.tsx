import styles from './PersonMainContent.module.scss';

import { FilmCard } from '@/components/FilmCard';
import type { ActorRole, Film, PersonActor } from '@/api/content/types';
import { LazyImg } from '@/components/LazyImg';
import { AppComponent } from '@/core';
import { PersonInfoTable } from '@/pages/PersonPage/PersonMainContent/PersonInfoTable';
import { concatClasses, getStaticUrl, objectEntries } from '@/utils';

const cx = concatClasses.bind(styles);

export interface PersonMainContentProps {
    person?: PersonActor;
}

const convertRoleToFilm = ({
    poster,
    genre,
    releaseYear,
    ...film
}: ActorRole): Film => ({
    ...film,
    posterURL: poster,
    genres: genre,
    movie: { release: new Date(`${releaseYear ?? 0}`).toISOString() },
});
export class PersonMainContent extends AppComponent<PersonMainContentProps> {
    render() {
        const { person } = this.props;

        const roles = person?.roles
            ? objectEntries(person?.roles).map<[string, Film[]]>(
                  ([key, value]) => [key, value.map(convertRoleToFilm)],
              )
            : [];

        return (
            <div className={cx('content')}>
                <div className={cx('top-info')}>
                    <LazyImg
                        className={cx('film-poster')}
                        src={getStaticUrl(person?.photoURL)}
                        width="232px"
                        height="347px"
                        alt={person?.name}
                    />
                    <section>
                        {person?.name && (
                            <h1 className={cx('title')}>{person.name}</h1>
                        )}
                        <PersonInfoTable person={person} />
                    </section>
                </div>
                <section className={cx('roles-section')}>
                    <h1>Фильмография:</h1>
                    <div className={cx('role-type-section')}>
                        {roles.map(([key, films]) => (
                            <section>
                                <h1>{key}</h1>
                                <div className={cx('grid-container')}>
                                    {films.map((film) => (
                                        <FilmCard film={film} size="small" />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </section>
            </div>
        );
    }
}
