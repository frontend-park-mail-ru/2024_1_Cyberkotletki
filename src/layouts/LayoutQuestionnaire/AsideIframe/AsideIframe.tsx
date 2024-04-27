import styles from './AsideIframe.module.scss';

import { icCloseUrl } from '@/assets/icons';
import { routes } from '@/App/App.routes';
import { Button } from '@/components/Button';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export type AsideIframeProps = Omit<
    App.DetailedHTMLProps<App.HTMLAttributes<HTMLElement>, HTMLElement>,
    'ref' | 'children'
>;
export interface AsideIframeState {
    iframeOpened?: boolean;
}

class Iframe extends AppComponent {
    componentShouldUpdate() {
        return false;
    }

    render(): AppNode {
        return (
            <iframe
                // referrerPolicy="no-referrer"
                loading="lazy"
                src={`${window.location.origin}${routes.questionnaire()}`}
                className={cx('iframe')}
                width={394}
            />
        );
    }
}

export class AsideIframe extends AppComponent<
    AsideIframeProps,
    AsideIframeState
> {
    state: AsideIframeState = { iframeOpened: false };

    handleClose = () => {
        this.setState((prev) => ({
            ...prev,
            iframeOpened: false,
        }));
    };

    componentDidMount(): void {
        setTimeout(() => {
            this.setState((prev) => ({
                ...prev,
                iframeOpened: true,
            }));
        }, 2000);
    }

    render(): AppNode {
        const { iframeOpened } = this.state;

        return (
            <aside className={cx('aside', { opened: iframeOpened })}>
                <Iframe />
                <Button
                    className={cx('close-button')}
                    isIconOnly
                    styleType="secondary"
                    outlined
                    onClick={this.handleClose}
                    rounded
                >
                    <img src={icCloseUrl} aria-hidden />
                </Button>
            </aside>
        );
    }
}
