import {concatClasses} from "@/utils";
import styles from "@/pages/CollectionsPage/CollectionsPage.module.scss";
import {News} from "@/api/news/types.ts";
import {AppComponent} from "@/core";
import {newsService} from "@/api/news/service.ts";

import { LayoutGrid } from '@/layouts/LayoutGrid';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { Spinner } from '@/components/Spinner';
import { NewsCard } from '@/components/NewsCard';

const cx = concatClasses.bind(styles);

export interface NewsPageState{
    isLoading: boolean;
    news: News[];
}

export class NewsPage extends AppComponent<
    object,
    NewsPageState
> {
     componentDidMount(): void {
        this.setState((prev) => ({
            ...prev, isLoading: true }));

        void newsService
            .getAllNews()
            .then((news) => {
                this.setState((prev) => ({
                    ...prev,
                    news: news,
                    isLoading: false,
                }));
            })
            .finally(() => {
                this.setState((prev) => ({
                    ...prev, isLoading: false }));
            });
        }

/*        // получить все новости
        const allNews = (
            await Promise.all(
                this.state.news?.map((news) =>
                    newsService.getNewsById(news.id!),
                ) ?? [],
            )
        ).filter(Boolean) as News[];

        this.setState((prev) => ({
            ...prev,
            news: allNews
                .map((news) => news)
                .flat() // удаляет один уровень вложенности
                .filter(Boolean) as News[], // удаляет все пустые значения
        }));*/

        /*void newsService
            .getAllNews()
            .then((news) => {
                this.setState((prev) => ({
                    ...prev,
                    news: news,
                }));
            });*/


    render() {
        const { news, isLoading } = this.state;

        return (
            <LayoutWithHeader>
                {isLoading ? (
                    <div className={cx('loader-container')}>
                        <Spinner />
                    </div>
                ) : (
                    <section>
                        <h1 className={cx('head')}>Новости</h1>

                        <LayoutGrid className={cx('grid-container')}>
                            {news && news.map((newsItem) => <NewsCard news={newsItem} />)}
                        </LayoutGrid>

                    </section>
                )}
            </LayoutWithHeader>

        );
    }
}


