import styles from './PersonMainContent.module.scss';

import type { Person } from '@/api/content/types';
import { LazyImg } from '@/components/LazyImg';
import { AppComponent } from '@/core';
import { InfoTable } from '@/pages/PersonPage/PersonMainContent/InfoTable/InfoTable';
import { Config } from '@/shared/constants';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface PersonMainContentProps {
    person?: Person;
}

export class PersonMainContent extends AppComponent<PersonMainContentProps> {
    render() {
        const { person } = this.props;

        return (
            <div className={cx('content')}>
                <LazyImg
                    className={cx('film-poster')}
                    src={`${Config.BACKEND_STATIC_URL}/${person?.photoURL ?? ''}`}
                    width="232px"
                    height="330px"
                />
                <div className={cx('section')}>
                    <div className={cx('top-info')}>
                        <section>
                            {person?.firstName && (
                                <h1 className={cx('title')}>
                                    {person?.firstName} {person?.lastName}
                                </h1>
                            )}
                            <InfoTable person={person} />
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
