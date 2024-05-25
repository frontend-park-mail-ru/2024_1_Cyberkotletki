
//import {routes, RoutesValues} from '@/App/App.routes';
import {News} from "@/api/news/types.ts";
import {AppComponent} from "@/core";
import {concatClasses} from "@/utils";
import styles from './NewsCard.module.scss';
import {Link} from "@/components/Link";
import {routes} from "@/App/App.routes.ts";

const cx = concatClasses.bind(styles);

export interface NewsCardProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'children'
    > {
    news?: News
    //newsId?: number
    //Link?: RoutesValues | ''
}

export class NewsCard extends AppComponent<NewsCardProps> {
    LinlRef: App.RefObject<HTMLAnchorElement> = {current: null};

    /*render() {
        const {
            className,
            news,
            link = routes.news(news?.id ?? 0),
            ...props
        } = this.props;

        ////////// подозрительные ID
        return (
            <div className={cx('card', className)}>
                {link ? (
                    <Link href={link} ref={this.LinlRef}>
                        <h1 className={cx('title')} title={news?.title}>
                            {news?.title}
                        </h1>
                    </Link>
                ) : (
                    <h1 className={cx('title')} title={news?.title}>
                        {news?.title}
                    </h1>
                )}


                <article {...props} className={cx('item')}>
                    <img src={this.props.news?.pictureURL}
                         alt="Постер новости"
                         className={cx('poster')}
                         width="320px"
                         height="180px"
                    />
                    <div className={cx('info')}>
                        <h1 className={cx('head')} title={this.props.news?.title}>
                            {this.props.news?.title}
                        </h1>
                        <time className={cx('date')} dateTime={this.props.news?.date}>
                            {this.props.news?.date}
                        </time>
                    </div>
                </article>
            </div>

        );
    }*/

    render() {
        const { className, news, ...props } = this.props;

        return (
            <Link
                className={cx(className)}
                href={routes.news(news?.id)}
                aria-label={news?.title}
            >
                <article {...props} className={cx('item')}>
                    <img src={this.props.news?.pictureURL}
                         alt="Постер новости"
                         className={cx('poster')}
                         width="320px"
                         height="180px"
                    />
                    <div className={cx('info')}>
                        <h1 className={cx('head')}
                            title={this.props.news?.title}>
                            {this.props.news?.title}
                        </h1>
                        <time className={cx('date')}
                              dateTime={this.props.news?.date}>
                            {this.props.news?.date}
                        </time>
                    </div>
                </article>
            </Link>

        )

    }


}
