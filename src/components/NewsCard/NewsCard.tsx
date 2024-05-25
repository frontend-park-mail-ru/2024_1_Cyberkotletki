import styles from './NewsCard.module.scss';

import type { News } from '@/api/news/types.ts';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';
import { Link } from '@/components/Link';
import { routes } from '@/App/App.routes.ts';

const cx = concatClasses.bind(styles);

export interface NewsCardProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'children'
    > {
    news?: News;
}

export class NewsCard extends AppComponent<NewsCardProps> {
    LinlRef: App.RefObject<HTMLAnchorElement> = { current: null };

    render() {
        const { className, news, ...props } = this.props;

        return (
            <Link
                className={cx(className)}
                href={routes.news(news?.id)}
                aria-label={news?.title}
            >
                <article {...props} className={cx('item')}>
                    <img
                        src={this.props.news?.pictureURL}
                        alt="Постер новости"
                        className={cx('poster')}
                        width="320px"
                        height="180px"
                    />
                    <div className={cx('info')}>
                        <h1
                            className={cx('head')}
                            title={this.props.news?.title}
                        >
                            {this.props.news?.title}
                        </h1>
                        <time
                            className={cx('date')}
                            dateTime={this.props.news?.date}
                        >
                            {this.props.news?.date}
                        </time>
                    </div>
                </article>
            </Link>
        );
    }
}
