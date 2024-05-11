import styles from './PersonPage.module.scss';

import type { PersonActor } from '@/api/content/types.ts';
import { AppComponent } from '@/core';
import { concatClasses, isDefined } from '@/utils';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { NotFound } from '@/components/NotFound';
import { PersonMainContent } from '@/pages/PersonPage/PersonMainContent';
import { Spinner } from '@/components/Spinner';
import { ContentContext } from '@/Providers/ContentProvider';
import type { AppContext } from '@/types/Context.types';

const cx = concatClasses.bind(styles);

export interface PersonPageState {
    person?: PersonActor;
    isNotFound?: boolean;
    isLoading?: boolean;
}

class PersonPageInner extends AppComponent<
    { context?: AppContext },
    PersonPageState
> {
    state: PersonPageState = { isLoading: false };

    getPersonById = async () => {
        const { params } =
            (window.history.state as {
                params?: { uid?: string };
            }) ?? {};

        if (isDefined(params?.uid)) {
            this.setState((prev) => ({ ...prev, isLoading: true }));

            await this.props.context?.content
                ?.loadPersonById?.(+params.uid)
                .then((person) => {
                    this.setState((prev) => ({ ...prev, person }));
                })
                .catch(() => {
                    this.setState((prev) => ({
                        ...prev,
                        isNotFound: true,
                    }));
                });

            this.setState((prev) => ({ ...prev, isLoading: false }));

            return;
        }

        this.setState((prev) => ({
            ...prev,
            isNotFound: true,
        }));
    };

    componentDidMount(): void {
        const { params } =
            (window.history.state as {
                params?: { uid?: string };
            }) ?? {};

        const personsMap = this.props.context?.content?.personsMap;

        if (!personsMap?.[Number(params?.uid)]) {
            void this.getPersonById();
        }
    }

    render() {
        const { params } =
            (window.history.state as {
                params?: { uid?: string };
            }) ?? {};

        const { isLoading, isNotFound } = this.state;

        const person =
            this.props.context?.content?.personsMap[Number(params?.uid)] ??
            this.state.person;

        switch (true) {
            case isLoading:
                return (
                    <div className={cx('spinner-container')}>
                        <Spinner />
                    </div>
                );
            case isNotFound:
                return <NotFound description="Персона не найдена" />;
            default:
                return <PersonMainContent person={person} />;
        }
    }
}

class PersonPageClass extends AppComponent<{ context?: AppContext }> {
    render() {
        return (
            <LayoutWithHeader>
                <PersonPageInner context={this.props.context} />
            </LayoutWithHeader>
        );
    }
}

export const PersonPage = ContentContext.Connect(PersonPageClass);
