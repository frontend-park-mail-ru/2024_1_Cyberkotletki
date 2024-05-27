import styles from './CollectionsPage.module.scss';

import { ContentContext } from '@/Providers/ContentProvider';
import type { Compilation, CompilationType } from '@/api/content/types';
import { Button } from '@/components/Button';
import { CompilationItem } from '@/components/CompilationItem';
import { Spinner } from '@/components/Spinner';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutGrid } from '@/layouts/LayoutGrid';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import type { AppContextComponentProps } from '@/types/Context.types';
import { concatClasses, createQueryParams, isDefined } from '@/utils';

const cx = concatClasses.bind(styles);

export interface CollectionsPageState {
    isLoading: boolean;
    compilationTypes?: CompilationType[];
    compilations?: Compilation[];
    filteredCompilations?: Compilation[];
}

const SEARCH_PARAM_TYPE = 'type';

export class CollectionsPageInner extends AppComponent<
    AppContextComponentProps,
    CollectionsPageState
> {
    loadAllData = async () => {
        const { compilationTypes, compilations, loadCompilations } =
            this.props.context?.content ?? {};

        if (!compilationTypes || !compilations) {
            this.setState((prev) => ({ ...prev, isLoading: true }));

            await loadCompilations?.()
                .then(({ compilationTypes, compilations }) => {
                    this.setState((prev) => ({
                        ...prev,
                        compilationTypes,
                        compilations,
                    }));
                })
                .finally(() => {
                    this.setState((prev) => ({ ...prev, isLoading: false }));
                });
        }
    };

    componentDidMount() {
        void this.loadAllData().then(() => {
            const searchType = Number(
                new URLSearchParams(window.location.search).get(
                    SEARCH_PARAM_TYPE,
                ),
            );

            this.handleTypeChange(searchType || undefined);
        });
    }

    handleTypeChange = (typeId?: number) => {
        const compilations =
            this.state.compilations ??
            this.props.context?.content?.compilations;

        if (isDefined(typeId)) {
            window.history.replaceState(
                window.history.state,
                '',
                createQueryParams({ [SEARCH_PARAM_TYPE]: typeId }),
            );

            this.setState((prev) => ({
                ...prev,
                filteredCompilations: compilations?.filter(
                    (compilation) => compilation.compilation_type_id === typeId,
                ),
            }));
        } else {
            window.history.replaceState(
                window.history.state,
                '',
                window.location.pathname,
            );

            this.setState((prev) => ({
                ...prev,
                filteredCompilations: compilations,
            }));
        }
    };

    render(): AppNode {
        const { filteredCompilations, isLoading } = this.state;

        const compilationTypes =
            this.state.compilationTypes ??
            this.props.context?.content?.compilationTypes;

        const searchType = Number(
            new URLSearchParams(window.location.search).get(SEARCH_PARAM_TYPE),
        );

        return (
            <LayoutWithHeader>
                {isLoading ? (
                    <div className={cx('loader-container')}>
                        <Spinner />
                    </div>
                ) : (
                    <section>
                        <h1 className={cx('head')}>Подборки</h1>
                        <div className={cx('toggle-buttons')}>
                            <Button
                                onClick={() => this.handleTypeChange()}
                                styleType={
                                    !searchType ? 'primary' : 'secondary'
                                }
                                outlined={!!searchType}
                            >
                                Показать все
                            </Button>
                            {compilationTypes?.map((type) => (
                                <Button
                                    onClick={() =>
                                        this.handleTypeChange(type.id)
                                    }
                                    styleType={
                                        searchType === type.id
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                    outlined={searchType !== type.id}
                                >
                                    {type.type}
                                </Button>
                            ))}
                        </div>
                        <LayoutGrid className={cx('grid-container')}>
                            {filteredCompilations?.map((compilation) => (
                                <CompilationItem compilation={compilation} />
                            ))}
                        </LayoutGrid>
                    </section>
                )}
            </LayoutWithHeader>
        );
    }
}

class CollectionsPageClass extends AppComponent<AppContextComponentProps> {
    render() {
        return <CollectionsPageInner context={this.props.context} />;
    }
}

export const CollectionsPage = ContentContext.Connect(CollectionsPageClass);
