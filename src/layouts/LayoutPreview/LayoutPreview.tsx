import styles from './LayoutPreview.module.scss';

import { Button } from '@/components/Button';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';
import type { RoutesValues } from '@/App/App.routes';

const cx = concatClasses.bind(styles);

export interface LayoutPreviewProps
    extends Omit<
        App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
        'ref'
    > {
    forwardRef?: App.Ref<HTMLElement>;
    className?: string;
    title?: string;
    moreTitle?: string;
    moreLink?: RoutesValues;
}

export class LayoutPreview extends AppComponent<LayoutPreviewProps> {
    render() {
        const {
            className,
            children,
            title,
            moreTitle,
            moreLink,
            forwardRef,
            ...props
        } = this.props;

        return (
            <section
                className={cx('container', className)}
                {...props}
                ref={forwardRef}
            >
                <div className={cx('head-container')}>
                    {title && (
                        <h1 title={title} className={cx('head')}>
                            {title}
                        </h1>
                    )}
                    {moreTitle && (
                        <Button
                            outlined
                            styleType="secondary"
                            href={moreLink}
                            aria-label={moreTitle}
                        >
                            {moreTitle}
                        </Button>
                    )}
                </div>
                {children}
            </section>
        );
    }
}
