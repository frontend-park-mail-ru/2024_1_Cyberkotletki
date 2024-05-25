import {concatClasses, isDefined} from "@/utils";
import styles from "@/pages/CollectionsPage/CollectionsPage.module.scss";
import {News} from "@/api/news/types.ts";
import {AppComponent} from "@/core";

import { LazyImg } from '@/components/LazyImg';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { Spinner } from '@/components/Spinner';
import type {AppContextComponentProps} from "@/types/Context.types.ts";
import {NotFound} from "@/components/NotFound";
import { NewsColumn } from "@/pages/NewsDetailsPage/NewsColumn";
import { Button } from "@/components/Button";
import {newsService} from "@/api/news/service.ts";

const cx = concatClasses.bind(styles);

export interface NewsDetailsPageState{
    news?: News
    isNotFound?: boolean;
    isLoading: boolean;
}

interface Params {
    uid?: string;
}

export class NewsDetailsPage extends AppComponent<
    AppContextComponentProps,
    NewsDetailsPageState
> {
    getNewsById = (id: number) => {
        console.log('getNewsById NewsDetailsPage');
        if (isDefined(id)) {
            console.log('1 NewsDetailsPage');
            this.setState((prev) => ({ ...prev, isLoading: true }));

            void newsService
                .getNewsById(id)
                .then((news) => {
                    console.log('2 NewsDetailsPage');
                    this.setState((prev) => ({ ...prev, news }));
                })
                .finally(() => {
                    this.setState((prev) => ({ ...prev, isLoading: false }));
                });

            /*void this.props.context?.content
                ?.loadNewsById?.(id)
                .finally(() => {
                    console.log('2 NewsDetailsPage');
                    this.setState((prev) => ({ ...prev, isLoading: false }));
                })
                .then((news) => {
                    console.log('3 NewsDetailsPage');
                    this.setState((prev) => ({ ...prev, news }));
                })
                .catch(() => {
                    console.log('4 NewsDetailsPage');
                    this.setState((prev) => ({...prev, isNotFound: true}));
                });*/
        }
        else {
            console.log('5 NewsDetailsPage');
            this.setState((prev) => ({...prev, isNotFound: true}));
        }
    }

    componentDidMount(): void {
        console.log('componentDidMount NewsDetailsPage ');
        const { params } = window.history.state as { params?: Params };

        const newsMap = this.props.context?.content?.newsMap;

        const paramsId = Number(params?.uid);

        if (!newsMap?.[paramsId]) {
            console.log('IF componentDidMount NewsDetailsPage ');
            this.getNewsById(paramsId);
        }
    }


    render() {
        console.log('render NewsDetailsPage ');
        const { params } = window.history.state as { params?: Params };
        const news =
            this.props.context?.content?.newsMap?.[Number(params?.uid)] ?? this.state.news ??
            this.state.news;
        const { isNotFound, isLoading } = this.state;

        switch (true) {
            case isNotFound:
                console.log('nf NewsDetailsPage ');
                return (
                    <LayoutWithHeader>
                        <NotFound description="Фильм не найден" />
                    </LayoutWithHeader>
                );
            case isLoading:
                console.log('l NewsDetailsPage ');
                return (
                    <LayoutWithHeader>
                        <div className={cx('loader-container')} key="loader">
                            <Spinner />
                        </div>
                    </LayoutWithHeader>
                );
            default:
                console.log('d NewsDetailsPage ');
                return (
                    <LayoutWithHeader>

                            <col className={cx('top-info')}>
                                <h1 className={cx('title')}>{news?.title}</h1>
                                <p className={cx('date')}>{news?.date}</p>
                                <LazyImg
                                    //className={cx('image')}
                                    src={news?.pictureURL}
                                    alt={news?.title}
                                />

                                <p className={cx('text')}>{news?.text}</p>
                            </col>
                            <col className={cx('news-list')}>
                                <h3 className={cx('title')}>Последние новости</h3>
                                <Button> Все новости </Button>

                                <div className={cx('news-column-container')}>
                                    <NewsColumn />
                                </div>
                            </col>

                    </LayoutWithHeader>
                )
        }
    }
}


