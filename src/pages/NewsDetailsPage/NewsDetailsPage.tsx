import { concatClasses, isDefined } from '@/utils';
import styles from '@/pages/NewsDetailsPage/NewsDetailsPage.module.scss';
import type { News } from '@/api/news/types.ts';
import { AppComponent } from '@/core';
import { LazyImg } from '@/components/LazyImg';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { Spinner } from '@/components/Spinner';
import type { AppContextComponentProps } from '@/types/Context.types.ts';
import { NotFound } from '@/components/NotFound';
import { NewsColumn } from '@/pages/NewsDetailsPage/NewsColumn';
import { Button } from '@/components/Button';
import { newsService } from '@/api/news/service.ts';
import { routes } from '@/App/App.routes.ts';

const cx = concatClasses.bind(styles);

export interface NewsDetailsPageState {
    news?: News;
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
        if (isDefined(id)) {
            this.setState((prev) => ({ ...prev, isLoading: true }));

            void newsService
                .getNewsById(id)
                .then((news) => {
                    this.setState((prev) => ({ ...prev, news }));
                })
                .finally(() => {
                    this.setState((prev) => ({ ...prev, isLoading: false }));
                });
        } else {
            this.setState((prev) => ({
                ...prev,
                isNotFound: true,
            }));
        }
    };

    componentDidMount(): void {
        const { params } = window.history.state as { params?: Params };

        const newsMap = this.props.context?.content?.newsMap;

        const paramsId = Number(params?.uid);

        if (!newsMap?.[paramsId]) {
            this.getNewsById(paramsId);
        }
    }

    render() {
        const { params } = window.history.state as { params?: Params };
        const news =
            this.props.context?.content?.newsMap?.[Number(params?.uid)] ??
            this.state.news ??
            this.state.news;
        const { isNotFound, isLoading } = this.state;

        switch (true) {
            case isNotFound:
                return (
                    <LayoutWithHeader>
                        <NotFound description="Фильм не найден" />
                    </LayoutWithHeader>
                );
            case isLoading:
                return (
                    <LayoutWithHeader>
                        <div className={cx('loader-container')} key="loader">
                            <Spinner />
                        </div>
                    </LayoutWithHeader>
                );
            default:
                return (
                    <LayoutWithHeader>
                        <col className={cx('top-info')}>
                            <h1 className={cx('title')}>{news?.title}</h1>
                            <p className={cx('date')}>{news?.date}</p>
                            <LazyImg src={news?.pictureURL} alt={news?.title} />

                            <p className={cx('text')}>{news?.text}</p>
                        </col>
                        <col className={cx('news-list')}>
                            <h3 className={cx('title')}>Последние новости</h3>
                            <Button href={routes.news('')}>Все новости </Button>
                            <div className={cx('news-column-container')}>
                                <NewsColumn />
                            </div>
                        </col>
                    </LayoutWithHeader>
                );
        }
    }
}
