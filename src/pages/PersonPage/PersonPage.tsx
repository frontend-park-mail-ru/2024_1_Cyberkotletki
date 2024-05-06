import styles from './PersonPage.module.scss';

import type { PersonActor } from '@/api/content/types.ts';
import { AppComponent } from '@/core';
import { concatClasses, isDefined } from '@/utils';
import { contentService } from '@/api/content/service.ts';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { NotFound } from '@/components/NotFound';
import { PersonMainContent } from '@/pages/PersonPage/PersonMainContent';
import { Spinner } from '@/components/Spinner';

const cx = concatClasses.bind(styles);

export interface PersonPageState {
    person?: PersonActor;
    isNotFound?: boolean;
    isLoading?: boolean;
}

class PersonPageInner extends AppComponent<object, PersonPageState> {
    state: PersonPageState = { isLoading: false };

    getPersonById = async () => {
        const { params } =
            (window.history.state as {
                params?: { uid?: string };
            }) ?? {};

        if (isDefined(params?.uid)) {
            this.setState((prev) => ({ ...prev, isLoading: true }));

            await contentService
                .getPersonById(+params.uid)
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

    render() {
        const { params } =
            (window.history.state as {
                params?: { uid?: string };
            }) ?? {};

        const { isLoading, person, isNotFound } = this.state;

        if (
            (!person || params?.uid !== `${person?.id ?? 0}`) &&
            !isLoading &&
            !isNotFound
        ) {
            void this.getPersonById();
        }

        if (isLoading) {
            return (
                <div className={cx('spinner-container')}>
                    <Spinner />
                </div>
            );
        }

        return isNotFound ? (
            <NotFound description="Персона не найдена" />
        ) : (
            <PersonMainContent person={this.state.person} />
        );
    }
}

export class PersonPage extends AppComponent {
    render() {
        return (
            <LayoutWithHeader>
                <PersonPageInner key="person-page" />
            </LayoutWithHeader>
        );
    }
}
