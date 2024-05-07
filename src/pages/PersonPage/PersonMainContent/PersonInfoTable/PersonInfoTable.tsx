import styles from './PersonInfoTable.module.scss';

import type { PersonActor } from '@/api/content/types';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses, getHumanDate } from '@/utils';

const cx = concatClasses.bind(styles);

export interface PersonInfoTableProps {
    person?: PersonActor;
}

const isDateDefined = (date?: string): date is string =>
    date ? new Date(date).getFullYear() > 1 : false;

export class PersonInfoTable extends AppComponent<PersonInfoTableProps> {
    render(): AppNode {
        const { person } = this.props;

        return (
            <table className={cx('table')}>
                <tbody>
                    {isDateDefined(person?.birthDate) && (
                        <tr>
                            <td className={cx('label')}>Дата рождения:</td>
                            <td>{getHumanDate(person.birthDate)}</td>
                        </tr>
                    )}
                    {isDateDefined(person?.deathDate) && (
                        <tr>
                            <td className={cx('label')}>Дата смерти:</td>
                            <td>{getHumanDate(person.deathDate)}</td>
                        </tr>
                    )}
                    {person?.sex && (
                        <tr>
                            <td className={cx('label')}>Пол:</td>
                            <td>
                                {person.sex === 'M' ? 'Мужской' : 'Женский'}
                            </td>
                        </tr>
                    )}
                    {isDateDefined(person?.startCareer) && (
                        <tr>
                            <td className={cx('label')}>Начало карьеры:</td>
                            <td>{getHumanDate(person.startCareer)}</td>
                        </tr>
                    )}
                    {isDateDefined(person?.endCareer) && (
                        <tr>
                            <td className={cx('label')}>Конец карьеры:</td>
                            <td>{getHumanDate(person.endCareer)}</td>
                        </tr>
                    )}
                    {person?.height && (
                        <tr>
                            <td className={cx('label')}>Рост:</td>
                            <td>{`${person.height} см`}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
