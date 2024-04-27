import styles from './QuestionnairePage.module.scss';

import { QuestionnaireMarkButtons } from '@/components/QuestionnaireMarkButtons';
import { Button } from '@/components/Button';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses, isDefined } from '@/utils';
import { questionService } from '@/api/question/service';
import type { PollQuestion } from '@/api/question/types';
import { LocalStorageKey } from '@/shared/constants';

const cx = concatClasses.bind(styles);

export interface QuestionnairePageState {
    questions?: PollQuestion[];
    activeIndex?: number;
    mark?: number;
}

export class QuestionnairePage extends AppComponent<
    object,
    QuestionnairePageState
> {
    idFromStorage = localStorage.getItem(
        LocalStorageKey.LAST_ANSWERED_QUESTION,
    );

    state: QuestionnairePageState = {
        activeIndex: isDefined(this.idFromStorage)
            ? +this.idFromStorage + 1
            : 0,
    };

    handleMarkChange = (mark: number) => {
        this.setState((prev) => ({ ...prev, mark }));
    };

    getLatestPoll = () => {
        void questionService.getLatestPoll().then(({ questions }) => {
            this.setState((prev) => ({ ...prev, questions }));
        });
    };

    handleActiveIndexChange = () => {
        const { questions, activeIndex = 0, mark } = this.state;

        void questionService
            .answerQuestion({
                id: questions?.[activeIndex].id ?? 0,
                answer: mark ?? 0,
            })
            .then(() => {
                localStorage.setItem(
                    LocalStorageKey.LAST_ANSWERED_QUESTION,
                    `${activeIndex ?? ''}`,
                );

                this.setState((prev) => ({
                    ...prev,
                    activeIndex: (prev.activeIndex ?? 0) + 1,
                }));
            });
    };

    render(): AppNode {
        const idFromStorage = localStorage.getItem(
            LocalStorageKey.LAST_ANSWERED_QUESTION,
        );

        const {
            questions,
            activeIndex = isDefined(idFromStorage) ? +idFromStorage + 1 : 0,
        } = this.state;

        if (!questions) {
            this.getLatestPoll();
        }

        return (
            <div className={cx('page')}>
                {activeIndex < (questions?.length ?? 0) ? (
                    <div>
                        <p className={cx('question')}>
                            {questions?.[activeIndex].text}
                        </p>
                        <QuestionnaireMarkButtons
                            key={activeIndex}
                            onMarkChange={this.handleMarkChange}
                        />
                        <Button
                            styleType="secondary"
                            outlined
                            className={cx('button')}
                            style="width:fit-content"
                            onClick={this.handleActiveIndexChange}
                        >
                            Далее
                        </Button>
                    </div>
                ) : (
                    <p className={cx('question')}>
                        Спасибо! Вы ответили на все вопросы
                    </p>
                )}
            </div>
        );
    }
}
