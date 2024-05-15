import {RoutesValues} from "@/App/App.routes.ts";
import {News} from "@/api/content/types.ts";
import {AppComponent} from "@/core";
import {concatClasses} from "@/utils";
import styles from './NewsCard.module.scss';

const cx = concatClasses.bind(styles);

export interface NewsCardProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref' | 'children'
    > {
    newsId?: number;
    news?: News;
    link?: RoutesValues | '';
}

export class NewsCard extends AppComponent<NewsCardProps> {
    render() {
        const {
            className,
            ...props
        } = this.props;

        // Заглушки для данных новости
        const news = {
            title: "Заголовок новости",
            date: "2024-01-01",
            poster: "url-изображения"
        };

        return (
            <article
                {...props}
                className={cx('card', className)}
            >
                <div className={cx('poster')}>
                    <img src={news.poster} alt={news.title} />
                </div>
                <div className={cx('title')}>
                    <h3 className={news.title}>
                        {news.title}
                    </h3>
                </div>
            </article>
        );
    }
}
