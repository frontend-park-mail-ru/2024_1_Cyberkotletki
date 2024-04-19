import styles from './ErrorMessage.module.scss';

import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface ErrorMessageProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref' | 'children'
    > {
    message: string;
    hint?: boolean;
}

export class ErrorMessage extends AppComponent<ErrorMessageProps> {
    render(): AppNode {
        const { message, className, hint, ...props } = this.props;

        return (
            <div className={cx('error', className, { hint })} {...props}>
                <span className={cx('message')}>{message}</span>
            </div>
        );
    }
}
