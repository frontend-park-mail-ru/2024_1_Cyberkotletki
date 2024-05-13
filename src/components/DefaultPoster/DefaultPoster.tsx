import styles from './DefaultPoster.module.scss';

import { icLogoUrl, icUserUrl } from '@/assets/icons';
import { AppComponent } from '@/core';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface DefaultPosterProps
    extends OmitChildren<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >
    > {
    type?: 'film' | 'person';
}

export class DefaultPoster extends AppComponent<DefaultPosterProps> {
    render() {
        const { className, type, ...props } = this.props;

        return (
            <div className={cx('poster', className)} {...props}>
                <img
                    src={type === 'film' ? icLogoUrl : icUserUrl}
                    aria-hidden
                />
            </div>
        );
    }
}
