import styles from './PersonPage.module.scss';

import type { PersonActor } from '@/api/content/types.ts';
import { AppComponent } from '@/core';
import { concatClasses } from '@/utils';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';
import { NotFound } from '@/components/NotFound';
import { PersonMainContent } from '@/pages/PersonPage/PersonMainContent';
import { Spinner } from '@/components/Spinner';
import { ContentContext } from '@/Providers/ContentProvider';
import type { AppContextComponentProps } from '@/types/Context.types';
import type { ParamsProps } from '@/types/ParamsProps.types';

const cx = concatClasses.bind(styles);

export interface PersonPageState {
    person?: PersonActor;
    isNotFound?: boolean;
    isLoading?: boolean;
}

interface PersonPageProps extends AppContextComponentProps {
    uid: number;
}

class PersonPageInner extends AppComponent<PersonPageProps, PersonPageState> {
    state: PersonPageState = { isLoading: false };

    loadPerson = async () => {
        const personsMap = this.props.context?.content?.personsMap;

        if (!personsMap?.[this.props.uid]) {
            this.setState((prev) => ({ ...prev, isLoading: true }));

            await this.props.context?.content
                ?.loadPersonById?.(this.props.uid)
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
        }
    };

    componentDidMount(): void {
        void this.loadPerson();
    }

    componentDidUpdate(
        _: PersonPageState | null,
        prevProps: PersonPageProps | null,
    ): void {
        if (prevProps?.uid !== this.props.uid) {
            void this.loadPerson();
        }
    }

    render() {
        const { isLoading, isNotFound } = this.state;

        const person =
            this.props.context?.content?.personsMap[this.props.uid] ??
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

class PersonPageClass extends AppComponent<
    AppContextComponentProps & ParamsProps,
    ParamsProps
> {
    componentDidUpdate(
        _: object | null,
        prevProps: (AppContextComponentProps & ParamsProps) | null,
    ): void {
        if (prevProps?.params?.uid !== this.props.params?.uid) {
            this.setState((prev) => ({ ...prev, params: this.props.params }));
        }
    }

    render() {
        const uid = Number((window.history.state as ParamsProps).params?.uid);

        return (
            <LayoutWithHeader>
                <PersonPageInner context={this.props.context} uid={uid} />
            </LayoutWithHeader>
        );
    }
}

export const PersonPage = ContentContext.Connect(PersonPageClass);
