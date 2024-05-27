import styles from './AccessNotificationsModal.module.scss';

import type { ModalProps } from '@/components/Modal/Modal';
import { Modal } from '@/components/Modal';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { icBellUrl } from '@/assets/icons';

const cx = concatClasses.bind(styles);

export interface AccessNotificationsModalProps
    extends Omit<ModalProps, 'children'> {
    onRequestPermission?: (result: NotificationPermission) => void;
    onAccessClick?: () => void;
}

export class AccessNotificationsModal extends AppComponent<
    AccessNotificationsModalProps,
    object
> {
    render(): AppNode {
        const { className, ...props } = this.props;

        return (
            <Modal {...props} className={cx('modal', className)}>
                <div className={cx('modal-content')}>
                    <div className={cx('main-info')}>
                        <Icon icon={icBellUrl} />
                        <p className={cx('text')}>
                            Разрешить отправлять уведомления?
                        </p>
                    </div>
                    <div className={cx('buttons-container')}>
                        <Button
                            outlined
                            styleType="secondary"
                            onClick={this.props.onClose}
                        >
                            Закрыть
                        </Button>
                        <Button onClick={this.props.onAccessClick}>
                            Разрешить
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }
}
