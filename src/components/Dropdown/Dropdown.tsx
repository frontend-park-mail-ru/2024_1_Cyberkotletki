import styles from './Dropdown.module.scss';

import { concatClasses } from '@/utils';
import { AppComponent } from '@/core';
import { Input } from '@/components/Input';
import { icArrowDownUrl } from '@/assets/icons';
import { Popover } from '@/components/Popover';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

const cx = concatClasses.bind(styles);

export interface SelectItem {
    value: string | number;
    title: string | number;
}

export interface DropdownProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'children'
    > {
    items?: SelectItem[];
    onSelectItem?: (item: SelectItem) => void;
    selectedItem?: SelectItem;
}

export interface DropdownState {
    popoverId: string;
    isOpen?: boolean;
    selectedItem?: SelectItem;
}

export class Dropdown extends AppComponent<DropdownProps, DropdownState> {
    state: DropdownState = {
        popoverId: crypto.randomUUID().replace(/[-\d]*/g, ''),
        selectedItem: this.props.selectedItem,
    };

    handleOpen = () => {
        this.setState((prev) => ({ ...prev, isOpen: true }));
    };

    handleClose = () => {
        this.setState((prev) => ({ ...prev, isOpen: false }));
    };

    handleSelect = (item: SelectItem) => {
        this.handleClose();
        this.setState((prev) => ({ ...prev, selectedItem: item }));
        this.props.onSelectItem?.(item);
    };

    componentDidUpdate(
        _: DropdownState | null,
        prevProps: DropdownProps | null,
    ): void {
        if (prevProps?.selectedItem !== this.props.selectedItem) {
            this.setState((prev) => ({
                ...prev,
                selectedItem: this.props.selectedItem,
            }));
        }
    }

    render() {
        const { className, items, ...props } = this.props;
        const { popoverId, isOpen, selectedItem } = this.state;

        return (
            <div className={cx('dropdown', className)} {...props}>
                <Input
                    popoverTarget={popoverId}
                    readOnly
                    containerClassName={cx('input')}
                    value={selectedItem?.title}
                    iconPos="end"
                    icon={
                        <Icon
                            icon={icArrowDownUrl}
                            className={cx('icon', { rotate: isOpen })}
                        />
                    }
                    type="button"
                />
                <Popover
                    isOpen={isOpen}
                    id={popoverId}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    className={cx('popover')}
                >
                    <div className={cx('items-list')}>
                        {items?.map((item) => (
                            <Button
                                isText
                                outlined
                                styleType="secondary"
                                isFullWidth
                                className={cx('item', {
                                    active: selectedItem?.value === item.value,
                                })}
                                onClick={() => this.handleSelect(item)}
                            >
                                {item.title}
                            </Button>
                        ))}
                    </div>
                </Popover>
            </div>
        );
    }
}
