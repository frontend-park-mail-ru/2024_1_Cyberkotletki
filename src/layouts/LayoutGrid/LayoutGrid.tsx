import styles from './LayoutGrid.module.scss';

import { concatClasses } from '@/utils';
import { AppComponent } from '@/core';

const cx = concatClasses.bind(styles);

export interface LayoutGridProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref'
    > {
    itemsPerRow?: number;
    itemsPerRowMobile?: number;
}

export class LayoutGrid extends AppComponent<LayoutGridProps> {
    divRef: App.RefObject<HTMLDivElement> = { current: null };

    setContainerStyle = (itemsPerRow: number, itemsPerRowMobile: number) => {
        if (this.divRef.current) {
            this.divRef.current.setAttribute(
                'style',
                `--grid-items-in-row: ${itemsPerRow}; --grid-items-in-row-mobile: ${itemsPerRowMobile}`,
            );
        }
    };

    componentDidMount(): void {
        this.setContainerStyle(
            this.props.itemsPerRow ?? 2,
            this.props.itemsPerRowMobile ?? 1,
        );
    }

    componentDidUpdate(
        _: object | null,
        prevProps: LayoutGridProps | null,
    ): void {
        const { props } = this;

        if (
            props.itemsPerRow !== prevProps?.itemsPerRow ||
            props.itemsPerRowMobile !== prevProps?.itemsPerRowMobile
        ) {
            this.setContainerStyle(
                props.itemsPerRow ?? 2,
                props.itemsPerRowMobile ?? 1,
            );
        }
    }

    render() {
        const { children, className, ...props } = this.props;

        return (
            <div
                className={cx('grid-container', className)}
                {...props}
                ref={this.divRef}
            >
                {children}
            </div>
        );
    }
}
