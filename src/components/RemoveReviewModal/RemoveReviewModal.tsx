import styles from './RemoveReviewModal.module.scss';

import type { ModalProps } from '@/components/Modal/Modal';
import { Modal } from '@/components/Modal';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';
import { Button } from '@/components/Button';

const cx = concatClasses.bind(styles);

export interface RemoveReviewModalProps extends Omit<ModalProps, 'children'> {
    onRemoveClick?: () => void;
}

export class RemoveReviewModal extends AppComponent<RemoveReviewModalProps> {
    render(): AppNode {
        const { className, onRemoveClick, ...props } = this.props;

        return (
            <Modal {...props} className={cx('modal', className)}>
                <div className={cx('modal-content')}>
                    <p className={cx('text')}>
                        Вы уверены, что хотите удалить отзыв?
                    </p>
                    <div className={cx('buttons-container')}>
                        <Button
                            outlined
                            styleType="secondary"
                            onClick={this.props.onClose}
                        >
                            Отменить
                        </Button>
                        <Button
                            outlined
                            styleType="error"
                            onClick={onRemoveClick}
                        >
                            Удалить
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }
}
