import styles from './VisibleObserver.module.scss';

import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses, isDefined } from '@/utils';

const cx = concatClasses.bind(styles);

export interface VisibleObserverProps
    extends App.DetailedHTMLProps<
        App.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    fadeInDelay?: number;
    fadeInDuration?: number;
    forceVisibleDelay?: number;
    onVisible?: () => void;
}

interface VisibleObserverState {
    ref: App.RefObject<HTMLDivElement>;
    observerListener: (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
    ) => void;
    observer?: IntersectionObserver;
    visible?: boolean;
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
                this.props.onVisible?.();

                this.state.visible = true;

                this.state.ref.current?.classList.add(cx('visible'));

                observer.disconnect();
            }
        },
    };

    componentDidMount(): void {
        const element = this.state.ref.current;

        if (!this.state.observer) {
            const observer = new IntersectionObserver(
                this.state.observerListener,
            );

            this.state.observer = observer;

            if (element) {
                observer.observe(element);
            }
        }

        if (isDefined(this.props.forceVisibleDelay)) {
            setTimeout(() => {
                this.props.onVisible?.();
                this.state.ref.current?.classList.add(cx('visible'));
                this.state.observer?.disconnect();
            }, this.props.forceVisibleDelay);
        }
    }

    render(): AppNode {
        const { className, children, fadeInDelay, fadeInDuration, ...props } =
            this.props;

        return (
            <div
                {...props}
                ref={this.state.ref}
                className={cx('container', className, {
                    visible: this.state.visible,
                })}
                style={`--fade-in-delay:${fadeInDelay ?? 200}ms; --fade-in-duration:${fadeInDuration ?? 400}ms`}
            >
                {children}
            </div>
        );
    }
}
