import type { Person } from '@/api/content/types.ts';
import { AppComponent } from '@/core';
import { isDefined } from '@/utils';
import { contentService } from '@/api/content/service.ts';
import { ResponseError } from '@/api/appFetch.ts';
import type { AppNode } from '@/core/shared/AppNode.types.ts';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { NotFound } from '@/components/NotFound';
import { PersonMainContent } from '@/pages/PersonPage/PersonMainContent';

export interface PersonPageState {
    person?: Person;
    isNotFound?: boolean;
}

export class PersonPage extends AppComponent<object, PersonPageState> {
    componentDidMount(): void {
        const { params } =
            (window.history.state as {
                params?: { uid?: string };
            }) ?? {};

        if (isDefined(params?.uid)) {
            void contentService
                .getPersonById(+params.uid)
                .then((person) => {
                    this.setState((prev) => ({ ...prev, person }));
                })
                .catch((error) => {
                    if (error instanceof ResponseError) {
                        this.setState((prev) => ({
                            ...prev,
                            isNotFound: true,
                        }));
                    }
                });
        }
    }

    render(): AppNode {
        return (
            <LayoutWithHeader key={'person-page'}>
                {this.state.isNotFound ? (
                    <NotFound description="Персона не найдена" />
                ) : (
                    <PersonMainContent person={this.state.person} />
                )}
                {/* <pre>{JSON.stringify(this.state.person, null, 2)}</pre> */}
            </LayoutWithHeader>
        );
    }
}
