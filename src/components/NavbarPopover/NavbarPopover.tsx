import styles from './NavbarPopover.module.scss';

import { icBurgerUrl, icCloseUrl } from '@/assets/icons';
import { AppComponent } from '@/core';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { concatClasses } from '@/utils';
import { Icon } from '@/components/Icon';
import { Popover } from '@/components/Popover';
import { Navbar } from '@/components/Navbar/Navbar';

const cx = concatClasses.bind(styles);

export interface NavbarPopoverProps
    extends OmitChildren<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >
    > {
    fv?: string;
}

interface NavbarPopoverState {
    isOpen?: boolean;
}

const NAVBAR_POPOVER_ID = 'navbar-popover';

export class NavbarPopover extends AppComponent<
    NavbarPopoverProps,
    NavbarPopoverState
> {
    handleOpen = () => {
        this.setState((prev) => ({ ...prev, isOpen: true }));
    };

    handleClose = () => {
        this.setState((prev) => ({ ...prev, isOpen: false }));
    };

    render() {
        const { className, ...props } = this.props;
        const { isOpen } = this.state;

        return (
            <div className={cx('container', className)} {...props}>
                <button
                    className={cx('button')}
                    popoverTarget={NAVBAR_POPOVER_ID}
                    popoverTargetAction="toggle"
                    aria-label="Toggle navbar"
                >
                    {isOpen ? (
                        <Icon
                            icon={icCloseUrl}
                            className={cx('icon', 'close-icon')}
                        />
                    ) : (
                        <Icon icon={icBurgerUrl} className={cx('icon')} />
                    )}
                </button>
                <Popover
                    id={NAVBAR_POPOVER_ID}
                    fixed
                    className={cx('popover')}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                >
                    <Navbar className={cx('navbar')} />
                </Popover>
            </div>
        );
    }
}
