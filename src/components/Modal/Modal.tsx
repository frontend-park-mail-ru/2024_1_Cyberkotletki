import styles from './Modal.module.scss';

import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface ModalProps
    extends Omit<
        App.DetailedHTMLProps<
            App.DialogHTMLAttributes<HTMLDialogElement>,
            HTMLDialogElement
        >,
        'ref'
    > {
    isOpen?: boolean;
    onClose?: () => void;
}

export interface ModalState {
    isOpen?: boolean;
    modalRef: App.RefObject<HTMLDialogElement>;
}

export class Modal extends AppComponent<ModalProps, ModalState> {
    state: ModalState = { modalRef: { current: null } };

    componentDidMount(): void {
        if (this.state.modalRef.current && this.props.isOpen)
            setTimeout(() => {
                this.state.modalRef.current?.showModal();
            });
    }

    componentDidUpdate(_: ModalState | null, prevProps: ModalProps | null) {
        if (prevProps?.isOpen !== this.props.isOpen) {
            if (this.props.isOpen) {
                this.state.modalRef.current?.showModal();
            } else {
                this.state.modalRef.current?.close();
            }
        }
    }

    handleModalClick = (e: App.MouseEvent<HTMLDialogElement, MouseEvent>) => {
        if (e.target === this.state.modalRef.current) {
            this.state.modalRef.current?.close();
        }
    };

    render(): AppNode {
        const { className, ...props } = this.props;

        return (
            <dialog
                {...props}
                ref={this.state.modalRef}
                className={cx('modal', className)}
                role="dialog"
                aria-modal
                onClick={this.handleModalClick}
            />
        );
    }
}
