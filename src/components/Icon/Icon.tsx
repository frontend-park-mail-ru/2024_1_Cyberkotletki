import styles from './Icon.module.scss';

import { AppComponent } from '@/core';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { concatClasses } from '@/utils';

const SVG_REGEXP = /(<svg).+(<\/svg>)/;

const cx = concatClasses.bind(styles);

export interface IconProps
    extends OmitChildren<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >
    > {
    icon?: string;
}

interface IconState {
    divRef: App.RefObject<HTMLDivElement>;
}

const getSvgString = (str: string) =>
    str?.match(SVG_REGEXP)?.[0].replace(/\\n/g, '').replace(/\\/g, '') ?? '';

export class Icon extends AppComponent<IconProps, IconState> {
    state: IconState = { divRef: { current: null } };

    iconAdded = false;

    handleInsertSvg = (icon?: string) => {
        const divElement = this.state.divRef.current;

        if (divElement && icon) {
            while (divElement.lastChild) {
                divElement.removeChild(divElement.lastChild);
            }

            // requestAnimationFrame(() => {
            const svg = getSvgString(icon);

            if (svg) {
                divElement.insertAdjacentHTML('afterbegin', svg);
            }
            // });
        }
    };

    componentDidMount(): void {
        this.handleInsertSvg(this.props.icon);
    }

    componentDidUpdate(_: object | null, prevProps: IconProps | null): void {
        if (prevProps?.icon !== this.props.icon) {
            this.handleInsertSvg(this.props.icon);
        }
    }

    render() {
        // ? icon не должен попасть в аттрибуты элемента
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { className, icon, ...props } = this.props;

        return (
            <div
                className={cx('container', className)}
                {...props}
                ref={this.state.divRef}
            />
        );
    }
}
