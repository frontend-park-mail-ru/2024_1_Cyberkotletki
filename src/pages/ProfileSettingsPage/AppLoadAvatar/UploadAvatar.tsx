import styles from './UploadAvatar.module.scss';

import { userService } from '@/api/user/service';
import { icEditUrl } from '@/assets/icons';
import { Avatar } from '@/components/Avatar';
import { CheckMark } from '@/components/CheckMark';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Spinner } from '@/components/Spinner';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface AppLoadAvatarProps {
    imageSrc?: string;
}

export interface AppLoadAvatarState {
    image?: File;
    imageUrl?: string;
    error?: string;
    isLoading?: boolean;
    isSuccess?: boolean;
}

export class UploadAvatar extends AppComponent<
    AppLoadAvatarProps,
    AppLoadAvatarState
> {
    inputRef: App.RefObject<HTMLInputElement> = { current: null };

    handleFileChange = (e: App.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[(e.target.files.length ?? 1) - 1];

        if (file) {
            this.setState((prev) => ({
                ...prev,
                image: file,
                imageUrl: file ? URL.createObjectURL(file as Blob) : '',
                isLoading: true,
            }));

            void userService
                .updateAvatar(file)
                .then(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isSuccess: true,
                    }));
                })
                .catch((error) => {
                    if (error instanceof Error) {
                        this.setState((prev) => ({
                            ...prev,
                            error: error.message,
                        }));
                    }
                })
                .finally(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isLoading: false,
                    }));
                });
        }
    };

    render() {
        const { imageSrc } = this.props;
        const { imageUrl, error, isSuccess, isLoading } = this.state;

        return (
            <div className={cx('container')}>
                <label
                    className={cx('label', { loading: isLoading })}
                    role="button"
                    tabIndex={0}
                    title="Выберите изображение"
                >
                    <Avatar
                        imageSrc={imageUrl || imageSrc}
                        prefix={imageUrl ? '' : undefined}
                    />
                    <div className={cx('edit-icon')}>
                        <img src={icEditUrl} />
                    </div>
                    <input
                        type="file"
                        accept="image/jpeg,image/gif,image/png"
                        ref={this.inputRef}
                        className={cx('hidden-input')}
                        tabIndex={-1}
                        onChange={this.handleFileChange}
                    />
                    <CheckMark show={isSuccess} />
                    {isLoading && <Spinner className={cx('spinner')} />}
                </label>
                {error && <ErrorMessage message={error} />}
            </div>
        );
    }
}
