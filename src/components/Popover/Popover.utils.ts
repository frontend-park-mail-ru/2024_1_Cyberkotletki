import type { PopoverProps } from '@/components/Popover/Popover';

export const positionPopover = (
    popover?: HTMLElement | null,
    triggerRect?: DOMRect,
    fitWidth?: boolean,
    horizonPos?: PopoverProps['horizonPos'],
    fixed?: boolean,
    opened?: boolean,
) => {
    if (popover) {
        popover.style.top = `calc(${(triggerRect?.top ?? 0) + (triggerRect?.height ?? 0) + (fixed || !opened ? 0 : window.scrollY)}px + var(--main-content-gap))`;
        popover.style.width = fitWidth
            ? 'fit-context'
            : `${triggerRect?.width ?? 0}px`;

        switch (horizonPos) {
            case 'center':
                popover.style.left = `${(triggerRect?.left ?? 0) + (triggerRect?.width ?? 0) / 2}px`;
                popover.style.transform = 'translateX(-50%)';

                break;
            case 'right':
                popover.style.left = `${triggerRect?.right ?? 0}px`;
                popover.style.transform = 'translateX(-100%)';

                break;
            case 'left':
            default:
                popover.style.left = `${triggerRect?.left ?? 0}px`;

                break;
        }
    }
};
