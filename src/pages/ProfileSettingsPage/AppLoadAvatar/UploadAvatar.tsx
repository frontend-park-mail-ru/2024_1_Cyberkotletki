import styles from './UploadAvatar.module.scss';

import { Avatar } from '@/components/Avatar';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface AppLoadAvatarProps {
    imageSrc?: string;
}

export class UploadAvatar extends AppComponent<AppLoadAvatarProps> {
    inputRef: App.RefObject<HTMLInputElement> = { current: null };

    render() {
        const { imageSrc } = this.props;

        return (
            <label className={cx('container')} role="button" tabIndex={0}>
                <Avatar imageSrc={imageSrc} />
                <input
                    type="file"
                    accept="image/*"
                    ref={this.inputRef}
                    className={cx('hidden-input')}
                    tabIndex={-1}
                />
            </label>
        );
    }
}
