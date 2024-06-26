import { positionPopover } from './Popover.utils';
import styles from './Popover.module.scss';

import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';

export interface PopoverProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref'
    > {
    id: string;
    isOpen?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    width?: 'fit';
    horizonPos?: 'center' | 'left' | 'right';
    fixed?: boolean;
}
const cx = concatClasses.bind(styles);

export interface PopoverState {
    triggerElement?: Element | null;
    triggerRect?: DOMRect;
    popoverRef: App.RefObject<HTMLDivElement>;
}

export class Popover extends AppComponent<PopoverProps, PopoverState> {
    state: PopoverState = {
        popoverRef: { current: null },
    };

    handleToggle = (e: ToggleEvent) => {
        const triggerElement = document.querySelector(
            `[popovertarget=${this.props.id}]`,
        );

        positionPopover(
            this.state.popoverRef.current,
            triggerElement?.getBoundingClientRect(),
            this.props.width === 'fit',
            this.props.horizonPos,
            this.props.fixed,
            e.newState === 'open',
        );

        if (e.newState === 'closed') {
            this.props.onClose?.();
        } else {
            this.props.onOpen?.();
        }
    };

    componentDidUpdate(
        _: PopoverState | null,
        prevProps: PopoverProps | null,
    ): void {
        if (prevProps?.isOpen !== this.props.isOpen) {
            if (this.props.isOpen) {
                this.state.popoverRef.current?.showPopover();
            } else {
                this.state.popoverRef.current?.hidePopover();
            }
        }
    }

    componentDidMount(): void {
        if (this.props.isOpen) {
            setTimeout(() => {
                if (this.state.popoverRef.current) {
                    this.state.popoverRef.current?.showPopover();
                }
            }, 10);
        }
    }

    render() {
        const { children, className, id, fixed, ...props } = this.props;

        return (
            <div
                className={cx('popover', className, { fixed })}
                popover="auto"
                id={id}
                {...props}
                onToggle={this.handleToggle}
                ref={this.state.popoverRef}
            >
                {children}
            </div>
        );
    }
}
