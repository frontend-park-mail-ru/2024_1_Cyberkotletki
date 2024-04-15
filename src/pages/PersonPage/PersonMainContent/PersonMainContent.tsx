import styles from './PersonMainContent.module.scss';

import { FilmCard } from '@/components/FilmCard';
import type { Film, PersonActor } from '@/api/content/types';
import { LazyImg } from '@/components/LazyImg';
import { AppComponent } from '@/core';
import { InfoTable } from '@/pages/PersonPage/PersonMainContent/InfoTable/InfoTable';
import { concatClasses, getStaticUrl } from '@/utils';

const cx = concatClasses.bind(styles);

export interface PersonMainContentProps {
    person?: PersonActor;
    roles?: Film[];
}

export class PersonMainContent extends AppComponent<PersonMainContentProps> {
    render() {
        const { person, roles } = this.props;

        return (
            <div className={cx('content')}>
                <div className={cx('top-info')}>
                    <LazyImg
                        className={cx('film-poster')}
                        src={getStaticUrl(person?.photoURL)}
                        width="232px"
                        height="330px"
                    />
                    <section>
                        {person?.firstName && (
                            <h1 className={cx('title')}>
                                {person?.firstName} {person?.lastName}
                            </h1>
                        )}
                        <InfoTable person={person} />
                    </section>
                </div>
                <section className={cx('roles-section')}>
                    <h1>Фильмография:</h1>
                    <div className={cx('grid-container')}>
                        {roles?.map((film) => (
                            <FilmCard film={film} size="small" />
                        ))}
                    </div>
                </section>
            </div>
        );
    }
}
