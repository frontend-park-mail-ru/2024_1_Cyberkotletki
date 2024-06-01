import styles from './PlayerButton.module.scss';

import { Button } from '@/components/Button';
import type { ModalProps } from '@/components/Modal/Modal';
import { AppComponent } from '@/core';
import { concatClasses, createQueryParams } from '@/utils';
import { Icon } from '@/components/Icon';
import { icPlayUrl } from '@/assets/icons';
import { PlayerModal } from '@/components/PlayerModal';

const cx = concatClasses.bind(styles);

export interface PlayerButtonProps extends ModalProps {
    streamingSrc?: string;
}

interface PlayerButtonState {
    isOpen?: boolean;
}

const IS_OPENED_SEARCH_PARAMS = 'watch';

export class PlayerButton extends AppComponent<
    PlayerButtonProps,
    PlayerButtonState
> {
    handleOpen = () => {
        window.history.replaceState(
            window.history.state,
            '',
            createQueryParams({ [IS_OPENED_SEARCH_PARAMS]: true }),
        );

        this.setState((prev) => ({ ...prev, isOpen: true }));
    };

    handleClose = () => {
        window.history.replaceState(
            window.history.state,
            '',
            window.location.pathname,
        );

        this.setState((prev) => ({ ...prev, isOpen: false }));
    };

    componentDidMount(): void {
        const searchParams = new URLSearchParams(window.location.search).get(
            IS_OPENED_SEARCH_PARAMS,
        );

        if (searchParams === 'true') {
            this.handleOpen();
        }
    }

    render() {
        const { streamingSrc } = this.props;
        const { isOpen } = this.state;

        return (
            <div>
                <Button className={cx('play-button')} onClick={this.handleOpen}>
                    <Icon icon={icPlayUrl} className={cx('play-icon')} />
                    Смотреть
                </Button>
                <PlayerModal
                    isOpen={isOpen}
                    onClose={this.handleClose}
                    streamingSrc={streamingSrc}
                />
            </div>
        );
    }
}
