import styles from './LayoutQuestionnaire.module.scss';
import { AsideIframe } from './AsideIframe';

import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';
import { ProfileContext } from '@/Providers/ProfileProvider';
import type { AppContext } from '@/types/Context.types';
import { questionService } from '@/api/question/service';
import type { PollQuestion } from '@/api/question/types';
import { LocalStorageKey } from '@/shared/constants';

const cx = concatClasses.bind(styles);

export interface LayoutQuestionnaireProps
    extends Omit<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref'
    > {
    context?: AppContext;
}

export interface LayoutQuestionnaireState {
    isLoggedIn?: boolean;
    questions?: PollQuestion[];
}

class LayoutQuestionnaireInner extends AppComponent<
    LayoutQuestionnaireProps,
    LayoutQuestionnaireState
> {
    getLatestPoll = () => {
        void questionService.getLatestPoll().then(({ questions }) => {
            this.setState((prev) => ({ ...prev, questions }));
        });
    };

    render(): AppNode {
        const idFromStorage = Number(
            localStorage.getItem(LocalStorageKey.LAST_ANSWERED_QUESTION) ?? '',
        );

        const canShow = idFromStorage < (this.state.questions?.length ?? 0) - 1;

        const { className, children, context, ...props } = this.props;
        const { isLoggedIn: stateIsLoggedIn } = this.state;

        const isLoggedIn = !!context?.profile?.profile || stateIsLoggedIn;

        if (!context?.profile?.profile || this.state.isLoggedIn === undefined) {
            void context?.profile?.getProfile().then((profile) => {
                this.setState((prev) => ({ ...prev, isLoggedIn: !!profile }));
            });
        }

        if (!this.state.questions) {
            this.getLatestPoll();
        }

        return (
            <div className={cx('container', className)} {...props}>
                {children}
                {isLoggedIn && canShow && <AsideIframe />}
            </div>
        );
    }
}

export const LayoutQuestionnaire = ProfileContext.Connect(
    LayoutQuestionnaireInner,
);
