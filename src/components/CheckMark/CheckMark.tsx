import styles from './CheckMark.module.scss';

import { icCheckUrl } from '@/assets/icons';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface CheckMarkProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref' | 'children'
    > {
    show?: boolean;
}

export class CheckMark extends AppComponent<CheckMarkProps> {
    render(): AppNode {
        const { show, className, ...props } = this.props;

        return (
            <div className={cx('check-mark', className, { show })} {...props}>
                <img src={icCheckUrl} />
            </div>
        );
    }
}
