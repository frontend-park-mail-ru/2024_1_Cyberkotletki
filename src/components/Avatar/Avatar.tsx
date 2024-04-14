import styles from './Avatar.module.scss';

import { LazyImg } from '@/components/LazyImg';
import { icUserCircleUrl } from '@/assets/icons';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { Config } from '@/shared/constants';
import { concatClasses } from '@/utils';
import type { LazyImgProps } from '@/components/LazyImg/LazyImg';

const cx = concatClasses.bind(styles);

export interface AvatarPropsProps extends LazyImgProps {
    imageSrc?: string;
    prefix?: string;
}

export class Avatar extends AppComponent<AvatarPropsProps> {
    render(): AppNode {
        const {
            prefix = Config.BACKEND_STATIC_URL,
            imageSrc,
            className,
            ...props
        } = this.props;

        return (
            <LazyImg
                width="144px"
                height="144px"
                {...props}
                className={cx('avatar', className)}
                src={imageSrc ? `${prefix}/${imageSrc}` : icUserCircleUrl}
                alt="user avatar"
            />
        );
    }
}
