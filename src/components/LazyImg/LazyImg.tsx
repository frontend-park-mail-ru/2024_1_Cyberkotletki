import styles from './LazyImg.module.scss';

import { concatClasses } from '@/utils';
import { AppComponent } from '@/core';

const cx = concatClasses.bind(styles);

export type LazyImgProps = Omit<
    App.DetailedHTMLProps<
        App.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    >,
    'ref' | 'children'
>;

export interface AppComponentState {
    isLoading?: boolean;
}

export class LazyImg extends AppComponent<LazyImgProps, AppComponentState> {
    state = { isLoading: true };

    handleLoad = (e: App.SyntheticEvent<HTMLImageElement, Event>) => {
        this.setState((prev) => ({
            ...prev,
            isLoading: false,
        }));

        this.props.onLoad?.(e);
    };

    // componentShouldUpdate(
    //     newConfig: LazyImgProps | null,
    //     newState: AppComponentState | null,
    // ): boolean {
    //     // return false;
    // }

    render() {
        const { isLoading } = this.state;
        const {
            className,
            loading = 'lazy',
            decoding = 'async',
            ...props
        } = this.props;

        return (
            <div className={cx('container', className, { loading: isLoading })}>
                <img
                    loading={loading}
                    decoding={decoding}
                    {...props}
                    onLoad={this.handleLoad}
                />
            </div>
        );
    }
}
