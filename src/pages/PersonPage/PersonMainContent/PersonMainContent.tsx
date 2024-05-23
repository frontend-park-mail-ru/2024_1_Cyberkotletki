import styles from './PersonMainContent.module.scss';

import { FilmCard } from '@/components/FilmCard';
import type { ActorRole, Film, PersonActor } from '@/api/content/types';
import { LazyImg } from '@/components/LazyImg';
import { AppComponent } from '@/core';
import { PersonInfoTable } from '@/pages/PersonPage/PersonMainContent/PersonInfoTable';
import {
    capitalize,
    concatClasses,
    getStaticUrl,
    objectEntries,
} from '@/utils';
import { LayoutGrid } from '@/layouts/LayoutGrid';
import { DefaultPoster } from '@/components/DefaultPoster';

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
                    {person?.photoURL ? (
                        <LazyImg
                            className={cx('film-poster')}
                            src={getStaticUrl(person?.photoURL)}
                            width="300px"
                            height="443px"
                            alt={person?.name}
                        />
                    ) : (
                        <DefaultPoster className={cx('film-poster')} />
                    )}
                    <section>
                        {person?.name && (
                            <h1 className={cx('title')}>{person.name}</h1>
                        )}
                        {person?.enName && (
                            <h2 className={cx('en-title')}>{person.enName}</h2>
                        )}
                        <PersonInfoTable
                            person={person}
                            className={cx('info-table')}
                        />
                    </section>
                </div>
                <section className={cx('roles-section')}>
                    <h1>Фильмография:</h1>
                    <div className={cx('role-type-section')}>
                        {roles.map(([key, films]) => (
                            <section className={cx('role-section')}>
                                <h1>{`${capitalize(key)}:`}</h1>
                                <LayoutGrid
                                    className={cx('grid-container')}
                                    itemsPerRow={6}
                                    itemsPerRowMobile={2}
                                >
                                    {films.map((film) => (
                                        <FilmCard film={film} size="small" />
                                    ))}
                                </LayoutGrid>
                            </section>
                        ))}
                    </div>
                </section>
            </div>
        );
    }
}
