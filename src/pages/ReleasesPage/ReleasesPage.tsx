import styles from './ReleasesPage.module.scss';

import { AppComponent } from '@/core';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import type { Film } from '@/api/content/types';
import { concatClasses, convertReleaseToFilm } from '@/utils';
import { Dropdown } from '@/components/Dropdown';
import { contentService } from '@/api/content/service';
import type { SelectItem } from '@/components/Dropdown/Dropdown';
import { LayoutGrid } from '@/layouts/LayoutGrid';
import { FilmCard } from '@/components/FilmCard';
import { MonthSelect } from '@/components/MonthSelect';
import { MONTHS } from '@/shared/constants';
import { Spinner } from '@/components/Spinner';
import { routes } from '@/App/App.routes';

const cx = concatClasses.bind(styles);

export interface IndexPageState {
    films?: Film[];
    releaseYears?: SelectItem[];
    releases?: Film[];
    selectedYear?: number;
    selectedMonth: number;
    isLoading?: boolean;
}

const CURRENT_MONTH_ITEM = {
    value: new Date().getMonth() + 1,
    title: MONTHS[new Date().getMonth()],
};

const MONTH_ITEMS = MONTHS.map((month, index) => ({
    title: month,
    value: index + 1,
}));

export class ReleasesPage extends AppComponent<object, IndexPageState> {
    state: IndexPageState = { selectedMonth: new Date().getMonth() + 1 };

    loadYears = () =>
        contentService.getReleaseYears().then((response) => {
            this.setState((prev) => ({
                ...prev,
                releaseYears: response?.years?.map((year) => ({
                    title: `${year} г.`,
                    value: year,
                })),
            }));

            return response;
        });

    loadReleases = (year: number, month: number) => {
        this.setState((prev) => ({ ...prev, isLoading: true }));
        void contentService
            .getReleasesByYearAndMonth(year, month)
            .then((response) => {
                this.setState((prev) => ({
                    ...prev,
                    selectedYear: year,
                    selectedMonth: month,
                    releases:
                        response?.ongoing_content_list?.map(
                            convertReleaseToFilm,
                        ),
                }));
            })
            .finally(() => {
                this.setState((prev) => ({ ...prev, isLoading: false }));
            });
    };

    componentDidMount() {
        void this.loadYears().then((response) => {
            this.loadReleases(
                response?.years?.[0] ?? 0,
                this.state.selectedMonth,
            );
        });
    }

    handleYearSelect = (item: SelectItem) => {
        this.loadReleases(+item.value, this.state.selectedMonth);
    };

    handleMonthSelect = (item: SelectItem) => {
        this.loadReleases(
            this.state.selectedYear ?? new Date().getFullYear(),
            +item.value,
        );
    };

    render() {
        const { releaseYears, isLoading, releases } = this.state;

        return (
            <LayoutWithHeader>
                <section className={cx('section')}>
                    <div className={cx('head')}>
                        <h1 className={cx('text-header-3-light')}>Календарь</h1>
                        <Dropdown
                            items={releaseYears}
                            selectedItem={releaseYears?.[0]}
                            onSelectItem={this.handleYearSelect}
                            className={cx('dropdown')}
                        />
                        <Dropdown
                            items={MONTH_ITEMS}
                            selectedItem={CURRENT_MONTH_ITEM}
                            onSelectItem={this.handleMonthSelect}
                            className={cx('dropdown', 'hide-on-desktop')}
                        />
                    </div>
                    <div className={cx('container')}>
                        <MonthSelect
                            selectedMonth={CURRENT_MONTH_ITEM}
                            onSelectMonth={this.handleMonthSelect}
                            className={cx('month-select', 'hide-on-mobile')}
                        />
                        <div className={cx('content-container')}>
                            <div
                                className={cx('content', {
                                    loading: isLoading,
                                })}
                            >
                                {releases?.length ? (
                                    <LayoutGrid
                                        itemsPerRow={6}
                                        itemsPerRowMobile={2}
                                        className={cx('grid-container')}
                                    >
                                        {releases?.map((film) => (
                                            <FilmCard
                                                film={film}
                                                size="small"
                                                link={routes.film(film.id ?? 0)}
                                                withReleaseBadge
                                            />
                                        ))}
                                    </LayoutGrid>
                                ) : (
                                    <p style="margin: auto">
                                        Нет ожидаемых релизов в указанном месяце
                                    </p>
                                )}
                            </div>
                            {isLoading && (
                                <div className={cx('spinner-container')}>
                                    <Spinner />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </LayoutWithHeader>
        );
    }
}
