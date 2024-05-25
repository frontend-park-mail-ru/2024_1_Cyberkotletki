import {concatClasses} from "@/utils";
import styles from "@/pages/NewsDetailsPage/NewsColumn/NewsColumn.module.scss";
import {News} from "@/api/news/types.ts";
import {AppComponent} from "@/core";
import {newsService} from "@/api/news/service.ts";

import { LayoutGrid } from '@/layouts/LayoutGrid';
import { Spinner } from '@/components/Spinner';
import { NewsCard } from '@/components/NewsCard';
import {LayoutPreview} from "@/layouts/LayoutPreview";

const cx = concatClasses.bind(styles);

export interface NewsColumnState{
    isLoading: boolean;
    news: News[];
}

export class NewsColumn extends AppComponent<
    object,
    NewsColumnState
> {
    componentDidMount(): void {
        this.setState((prev) => ({
            ...prev, isLoading: true }));

        void newsService
            .getNearestNews()
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


    render() {
        const { news, isLoading } = this.state;

        return (
            <LayoutPreview>
                {isLoading ? (
                    <div className={cx('loader-container')}>
                        <Spinner />
                    </div>
                ) : (
                    <section>
                        <h1 className={cx('head')}>Новости</h1>

                        <LayoutGrid itemsPerRow={1} itemsPerRowMobile={1} className={cx('grid-container')}>
                            {news && news.map((newsItem) => <NewsCard news={newsItem} />)}
                        </LayoutGrid>

                    </section>
                )}
            </LayoutPreview>

        );
    }
}


