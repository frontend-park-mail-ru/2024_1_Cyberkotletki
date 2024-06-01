import styles from './PlayerModal.module.scss';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import type { ModalProps } from '@/components/Modal/Modal';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';
import { Icon } from '@/components/Icon';
import { icCloseUrl } from '@/assets/icons';

const cx = concatClasses.bind(styles);

export interface PlayerModalProps extends ModalProps {
    streamingSrc?: string;
}

export class PlayerModal extends AppComponent<PlayerModalProps> {
    render() {
        const { streamingSrc, isOpen, className, ...props } = this.props;

        return (
            <Modal
                {...props}
                className={cx('modal', className)}
                isOpen={isOpen}
            >
                <Button
                    isIconOnly
                    outlined
                    styleType="secondary"
                    className={cx('close-button')}
                    onClick={props.onClose}
                >
                    <Icon icon={icCloseUrl} />
                </Button>
                {isOpen && (
                    <video
                        src={streamingSrc}
                        controls
                        autoPlay
                        className={cx('video')}
                    >
                        Ваш браузер не поддерживает тег video.
                    </video>
                )}
            </Modal>
        );
    }
}
