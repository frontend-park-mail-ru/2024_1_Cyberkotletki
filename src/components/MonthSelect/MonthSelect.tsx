import styles from './MonthSelect.module.scss';

import { Button } from '@/components/Button';
import type { SelectItem } from '@/components/Dropdown/Dropdown';
import { AppComponent } from '@/core';
import { MONTHS } from '@/shared/constants';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface MonthSelectProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'children'
    > {
    onSelectMonth?: (item: SelectItem) => void;
    selectedMonth?: SelectItem;
}

export interface MonthSelectState {
    selectedMonth?: SelectItem;
}

export class MonthSelect extends AppComponent<
    MonthSelectProps,
    MonthSelectState
> {
    state: MonthSelectState = { selectedMonth: this.props.selectedMonth };

    componentDidUpdate(
        _: MonthSelectState | null,
        prevProps: MonthSelectProps | null,
    ): void {
        if (prevProps?.selectedMonth !== this.props.selectedMonth) {
            this.setState((prev) => ({
                ...prev,
                selectedMonth: this.props.selectedMonth,
            }));
        }
    }

    handleSelect = (item: SelectItem) => {
        this.setState((prev) => ({ ...prev, selectedMonth: item }));
        this.props.onSelectMonth?.(item);
    };

    render() {
        const { className, ...props } = this.props;
        const { selectedMonth } = this.state;

        return (
            <div className={cx('list', className)} {...props}>
                {MONTHS.map((month, index) => (
                    <Button
                        outlined
                        styleType="secondary"
                        isText
                        onClick={() => {
                            this.handleSelect({
                                value: index + 1,
                                title: month,
                            });
                        }}
                        className={cx('item', {
                            active: selectedMonth?.value === index + 1,
                        })}
                    >
                        {month}
                    </Button>
                ))}
            </div>
        );
    }
}
