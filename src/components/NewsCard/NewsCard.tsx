
import { routes } from '@/App/App.routes';
import {News} from "@/api/news/types.ts";
import {AppComponent} from "@/core";
import {concatClasses} from "@/utils";
import styles from './NewsCard.module.scss';
import {Link} from "@/components/Link";

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
}

export class NewsCard extends AppComponent<NewsCardProps> {
    render() {
        const {
            className,
            news,
            ...props
        } = this.props;

        ////////// подозрительные ID
        return (
            <Link className={cx(className)}
                  aria-label={this.props.news?.title}
                  href={routes.news(this.props.news?.id)}
            >

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

            </Link>
        );
    }
}
