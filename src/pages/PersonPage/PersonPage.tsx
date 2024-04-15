import type { Film, PersonActor } from '@/api/content/types.ts';
import { AppComponent } from '@/core';
import { isDefined } from '@/utils';
import { contentService } from '@/api/content/service.ts';
import { ResponseError } from '@/api/appFetch.ts';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { NotFound } from '@/components/NotFound';
import { PersonMainContent } from '@/pages/PersonPage/PersonMainContent';

export interface PersonPageState {
    person?: PersonActor;
    isNotFound?: boolean;
    roles?: Film[];
    isLoading?: boolean;
}

class PersonPageInner extends AppComponent<object, PersonPageState> {
    getPersonById = () => {
        const { params } =
            (window.history.state as {
                params?: { uid?: string };
            }) ?? {};

        if (isDefined(params?.uid)) {
            this.setState((prev) => ({ ...prev, isLoading: true }));

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
                })
                .finally(() => {
                    this.setState((prev) => ({ ...prev, isLoading: false }));
                });

            return;
        }

        this.setState((prev) => ({
            ...prev,
            isNotFound: true,
        }));
    };

    render() {
        const { params } =
            (window.history.state as {
                params?: { uid?: string };
            }) ?? {};
        const { isLoading, person } = this.state;

        if ((!person || params?.uid !== `${person?.id ?? 0}`) && !isLoading) {
            this.getPersonById();
        }

        return this.state.isNotFound ? (
            <NotFound description="Персона не найдена" />
        ) : (
            <PersonMainContent
                person={this.state.person}
                roles={this.state.roles}
            />
        );
    }
}

export class PersonPage extends AppComponent {
    render() {
        return (
            <LayoutWithHeader>
                <PersonPageInner />
            </LayoutWithHeader>
        );
    }
}
