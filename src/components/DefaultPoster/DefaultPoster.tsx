import styles from './DefaultPoster.module.scss';

import { Icon } from '@/components/Icon';
import { icLogoUrl, icUserUrl } from '@/assets/icons';
import { AppComponent } from '@/core';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface DefaultPosterProps
    extends Omit<
        OmitChildren<
            App.DetailedHTMLProps<
                App.HTMLAttributes<HTMLDivElement>,
                HTMLDivElement
            >
        >,
        'ref'
    > {
    type?: 'film' | 'person';
}

export class DefaultPoster extends AppComponent<DefaultPosterProps> {
    render() {
        const { className, type, ...props } = this.props;

        return (
            <Icon
                icon={type === 'film' ? icLogoUrl : icUserUrl}
                className={cx('poster', className)}
                {...props}
            />
        );
    }
}
