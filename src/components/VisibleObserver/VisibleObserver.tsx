import styles from './VisibleObserver.module.scss';

import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface VisibleObserverProps
    extends App.DetailedHTMLProps<
        App.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    fadeInDelay?: number;
    fadeInDuration?: number;
}

interface VisibleObserverState {
    ref: App.RefObject<HTMLDivElement>;
    observerListener: (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
    ) => void;
    observer?: IntersectionObserver;
}

export class VisibleObserver extends AppComponent<
    VisibleObserverProps,
    VisibleObserverState
> {
    state: VisibleObserverState = {
        ref: { current: null },
        observerListener: (
            entries: IntersectionObserverEntry[],
            observer: IntersectionObserver,
        ) => {
            if (entries[entries.length - 1].intersectionRatio > 0) {
                this.state.ref.current?.classList.add(cx('visible'));

                observer.disconnect();
            }
        },
    };

    componentDidMount(): void {
        const element = this.state.ref.current;

        if (!this.state.observer) {
            setTimeout(() => {
                requestIdleCallback(() => {
                    const observer = new IntersectionObserver(
                        this.state.observerListener,
                    );

                    this.state.observer = observer;

                    if (element) {
                        observer.observe(element);
                    }
                });
            });
        }
    }

    render(): AppNode {
        const { className, children, fadeInDelay, fadeInDuration, ...props } =
            this.props;

        return (
            <div
                {...props}
                ref={this.state.ref}
                className={cx('container', className)}
                style={`--fade-in-delay:${fadeInDelay ?? 200}ms; --fade-in-duration:${fadeInDuration ?? 400}ms`}
            >
                {children}
            </div>
        );
    }
}
