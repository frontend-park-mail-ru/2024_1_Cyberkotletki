import styles from './Avatar.module.scss';

import { icUserCircleUrl } from '@/assets/icons';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface AppComponentProps {
    imageSrc?: string;
}

export interface AppComponentState {
    imgLoading?: boolean;
}

export class Avatar extends AppComponent<AppComponentProps, AppComponentState> {
    state = { imgLoading: true };

    render(): AppNode {
        return (
            <div className={cx('avatar', { loading: this.state.imgLoading })}>
                <img
                    loading="lazy"
                    decoding="async"
                    src={this.props.imageSrc || icUserCircleUrl}
                    alt="user avatar"
                    onLoad={() => {
                        this.setState((prev) => ({
                            ...prev,
                            imgLoading: false,
                        }));
                    }}
                />
            </div>
        );
    }
}
