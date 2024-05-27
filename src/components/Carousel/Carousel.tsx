import styles from './Carousel.module.scss';

import { icPlayUrl } from '@/assets/icons';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { AppComponent } from '@/core';
import {
    concatClasses,
    debounce,
    getIsMobile,
    getIsTablet,
    isDefined,
} from '@/utils';

const cx = concatClasses.bind(styles);

export interface CarouselProps
    extends App.DetailedHTMLProps<
        App.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    itemsPerView?: number;
    itemsPerViewTablet?: number;
    itemsPerViewMobile?: number;
}

interface CarouselState {
    carouselRef: App.RefObject<HTMLDivElement>;
    carouselWidth?: number;
    itemWidth: number;
    handlePrevClick?: number;
    scrollLeft: number;
    maxScrollLeft: number;
    canNextScroll?: boolean;
    canPrevScroll?: boolean;
    itemsPerViewCount: number;
}

export class Carousel extends AppComponent<CarouselProps, CarouselState> {
    state: CarouselState = {
        carouselRef: { current: null },
        itemWidth: 0,
        scrollLeft: 0,
        maxScrollLeft: 0,
        canNextScroll: true,
        canPrevScroll: false,
        itemsPerViewCount: 1,
    };

    setWidth = () => {
        const {
            itemsPerView = 1,
            itemsPerViewTablet = itemsPerView,
            itemsPerViewMobile = itemsPerView,
        } = this.props;

        const isMobile = getIsMobile();
        const isTablet = getIsTablet();

        const itemsCount = (() => {
            switch (true) {
                case isMobile:
                    return itemsPerViewMobile;
                case isTablet:
                    return itemsPerViewTablet;
                default:
                    return itemsPerView;
            }
        })();

        this.state.itemsPerViewCount = itemsCount;

        if (!isDefined(this.state.carouselWidth)) {
            this.state.carouselWidth =
                this.state.carouselRef.current?.clientWidth;

            this.state.itemWidth = (this.state.carouselWidth ?? 0) / itemsCount;

            const childElementCount =
                this.state.carouselRef.current?.childElementCount ?? 0;

            this.state.maxScrollLeft =
                (childElementCount - itemsCount) * this.state.itemWidth;
        }
    };

    handleNextClick = () => {
        this.setWidth();

        const { current } = this.state.carouselRef;
        const { itemsPerViewCount } = this.state;

        if (current) {
            current.scrollLeft =
                this.state.scrollLeft +
                this.state.itemWidth * (itemsPerViewCount - 1 || 1);
        }
    };

    handlePrevClick = () => {
        this.setWidth();

        const { current } = this.state.carouselRef;
        const { itemsPerViewCount } = this.state;

        if (current) {
            current.scrollLeft =
                this.state.scrollLeft -
                this.state.itemWidth * (itemsPerViewCount - 1 || 1);
        }
    };

    handleScroll = debounce(() => {
        this.setWidth();

        const scrollLeft = this.state.carouselRef.current?.scrollLeft ?? 0;

        this.state.scrollLeft = scrollLeft;

        const { maxScrollLeft } = this.state;

        const canPrevScroll = scrollLeft > 0;
        const canNextScroll = scrollLeft < maxScrollLeft;

        if (
            this.state.canPrevScroll !== canPrevScroll ||
            this.state.canNextScroll !== canNextScroll
        ) {
            this.setState((prev) => ({
                ...prev,
                canPrevScroll,
                canNextScroll,
            }));
        }
    }, 40);

    componentDidMount(): void {
        this.handleScroll();
    }

    componentDidUpdate(
        _: CarouselState | null,
        prevProps: CarouselProps | null,
    ): void {
        if (prevProps?.children !== this.props.children) {
            this.handleScroll();
        }
    }

    render() {
        const {
            className,
            itemsPerView = 1,
            itemsPerViewTablet,
            itemsPerViewMobile,
            children,
            ...props
        } = this.props;
        const { canNextScroll, canPrevScroll } = this.state;

        return (
            <div
                className={cx('carousel', className, {
                    'can-prev-scroll': canPrevScroll,
                    'can-next-scroll': canNextScroll,
                })}
                {...props}
                style={`--items-per-view: ${itemsPerView}; --items-per-view-tablet: ${itemsPerViewTablet ?? 'var(--items-per-view)'}; --items-per-view-mobile: ${itemsPerViewMobile ?? 'var(--items-per-view)'};`}
            >
                <Button
                    className={cx('control-button', 'prev', {
                        hidden: !canPrevScroll,
                    })}
                    onClick={this.handlePrevClick}
                    styleType="secondary"
                    isIconOnly
                >
                    <Icon icon={icPlayUrl} className={cx('play-icon')} />
                </Button>
                <Button
                    className={cx('control-button', 'next', {
                        hidden: !canNextScroll,
                    })}
                    onClick={this.handleNextClick}
                    styleType="secondary"
                    isIconOnly
                >
                    <Icon icon={icPlayUrl} className={cx('play-icon')} />
                </Button>
                <div
                    className={cx('scroll-container')}
                    ref={this.state.carouselRef}
                    onScroll={this.handleScroll}
                >
                    {children}
                </div>
            </div>
        );
    }
}
