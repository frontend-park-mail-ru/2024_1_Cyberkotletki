import styles from './InfoTable.module.scss';

import type { Person } from '@/api/content/types';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface InfoTableProps {
    person?: Person;
}

export class InfoTable extends AppComponent<InfoTableProps> {
    render(): AppNode {
        const { person } = this.props;

        return (
            <table className={cx('table')}>
                <tbody>
                    {person?.sex && (
                        <tr>
                            <td className={cx('label')}>Пол:</td>
                            <td>
                                {person.sex === 'M' ? 'Мужской' : 'Женский'}
                            </td>
                        </tr>
                    )}
                    {person?.height && (
                        <tr>
                            <td className={cx('label')}>Рост:</td>
                            <td>{person.height}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
