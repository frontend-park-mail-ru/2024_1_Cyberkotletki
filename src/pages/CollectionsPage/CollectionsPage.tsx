import styles from './CollectionsPage.module.scss';

import { contentService } from '@/api/content/service';
import type {
    Compilation,
    CompilationType,
    CompilationsResponse,
} from '@/api/content/types';
import { Button } from '@/components/Button';
import { CompilationItem } from '@/components/CompilationItem';
import { Spinner } from '@/components/Spinner';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { concatClasses, createQueryParams, isDefined } from '@/utils';

const cx = concatClasses.bind(styles);

export interface CollectionsPageState {
    isLoading: boolean;
    compilationTypes?: CompilationType[];
    compilations?: Compilation[];
    filteredCompilations?: Compilation[];
}

const SEARCH_PARAM_TYPE = 'type';

export class CollectionsPage extends AppComponent<
    object,
    CollectionsPageState
> {
    componentDidMount(): void {
        this.setState((prev) => ({ ...prev, isLoading: true }));
        void contentService
            .getCompilationTypes()
            .then(async (compilations) => {
                this.setState((prev) => ({
                    ...prev,
                    compilationTypes: compilations?.compilation_types,
                }));

                const allCompilations = (
                    await Promise.all(
                        compilations?.compilation_types?.map((compilation) =>
                            contentService.getCompilationByTypeId(
                                compilation.id!,
                            ),
                        ) ?? [],
                    )
                ).filter(Boolean) as CompilationsResponse[];

                this.setState((prev) => ({
                    ...prev,
                    compilations: allCompilations
                        .map((compilation) => compilation.compilations)
                        .flat()
                        .filter(Boolean) as Compilation[],
                }));

                const searchType = Number(
                    new URLSearchParams(window.location.search).get(
                        SEARCH_PARAM_TYPE,
                    ),
                );

                this.handleTypeChange(searchType || undefined);
            })
            .finally(() => {
                this.setState((prev) => ({ ...prev, isLoading: false }));
            });
    }

    handleTypeChange = (typeId?: number) => {
        if (isDefined(typeId)) {
            window.history.replaceState(
                {},
                '',
                createQueryParams({ [SEARCH_PARAM_TYPE]: typeId }),
            );

            this.setState((prev) => ({
                ...prev,
                filteredCompilations: this.state.compilations?.filter(
                    (compilation) => compilation.compilation_type_id === typeId,
                ),
            }));
        } else {
            window.history.replaceState({}, '', window.location.pathname);

            this.setState((prev) => ({
                ...prev,
                filteredCompilations: this.state.compilations,
            }));
        }
    };

    render(): AppNode {
        const { compilationTypes, filteredCompilations, isLoading } =
            this.state;

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
                        <div className={cx('grid-container')}>
                            {filteredCompilations?.map((compilation) => (
                                <CompilationItem compilation={compilation} />
                            ))}
                        </div>
                    </section>
                )}
            </LayoutWithHeader>
        );
    }
}
