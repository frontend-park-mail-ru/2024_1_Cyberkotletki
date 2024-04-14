import type { Film, PersonActor } from '@/api/content/types.ts';
import { AppComponent } from '@/core';
import { isDefined } from '@/utils';
import { contentService } from '@/api/content/service.ts';
import { ResponseError } from '@/api/appFetch.ts';
import type { AppNode } from '@/core/shared/AppNode.types.ts';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { NotFound } from '@/components/NotFound';
import { PersonMainContent } from '@/pages/PersonPage/PersonMainContent';

export interface PersonPageState {
    person?: PersonActor;
    isNotFound?: boolean;
    roles?: Film[];
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
                .then(async (person) => {
                    const filmIds = new Set<number>();

                    this.setState((prev) => ({ ...prev, person }));

                    person?.roles.forEach(({ id }) => {
                        filmIds.add(id);
                    });

                    const films = (
                        await Promise.all(
                            [...filmIds.values()].map((id) =>
                                contentService.getFilmById(id),
                            ),
                        )
                    ).filter(Boolean) as Film[];

                    this.setState((prev) => ({ ...prev, roles: films }));
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
            <LayoutWithHeader>
                {this.state.isNotFound ? (
                    <NotFound description="Персона не найдена" />
                ) : (
                    <PersonMainContent
                        person={this.state.person}
                        roles={this.state.roles}
                    />
                )}
            </LayoutWithHeader>
        );
    }
}
