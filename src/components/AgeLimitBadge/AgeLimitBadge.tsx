import styles from './AgeLimitBadge.module.scss';

import { AppComponent } from '@/core';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface AgeLimitBadgeProps
    extends OmitChildren<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >
    > {
    age: number;
}

export class AgeLimitBadge extends AppComponent<AgeLimitBadgeProps> {
    render() {
        const { age, className, ...props } = this.props;

        return (
            <div className={cx('badge', className)} {...props}>
                {`${age ?? ''}+`}
            </div>
        );
    }
}
