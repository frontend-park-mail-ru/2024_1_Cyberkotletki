import styles from './YouTubeIframe.module.scss';

import { concatClasses, getYouTubeLink } from '@/utils';
import { AppComponent } from '@/core';
import type { OmitChildren } from '@/types/OmitChildren.types';

const cx = concatClasses.bind(styles);

export type YouTubeIframeProps = OmitChildren<
    App.DetailedHTMLProps<
        App.IframeHTMLAttributes<HTMLIFrameElement>,
        HTMLIFrameElement
    >
>;

export class YouTubeIframe extends AppComponent<YouTubeIframeProps> {
    render() {
        const { src, className, ...props } = this.props;

        return src ? (
            <iframe
                loading="lazy"
                className={cx('iframe', className)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                src={getYouTubeLink(src)}
                {...props}
            />
        ) : null;
    }
}
