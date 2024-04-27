import { questionService } from '@/api/question/service';
import type { PollQuestion, PollQuestionBody } from '@/api/question/types';
import { QuestionCreateForm } from '@/components/QuestionCreateForm';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';

export interface QuestionnaireCreatePageState {
    questions?: PollQuestion[];
}

export class QuestionnaireCreatePage extends AppComponent<
    object,
    QuestionnaireCreatePageState
> {
    handleCreateQuestion = (body: PollQuestionBody) => {
        void questionService.createQuestion(body).then(() => {
            this.getLatestPoll();
        });
    };

    getLatestPoll = () => {
        void questionService.getLatestPoll().then(({ questions }) => {
            this.setState((prev) => ({ ...prev, questions }));
        });
    };

    render(): AppNode {
        const { questions } = this.state;

        if (!questions) {
            this.getLatestPoll();
        }

        return (
            <LayoutWithHeader>
                <div>
                    <section>
                        <h1>Вопросы</h1>
                        <ol>{questions?.map(({ text }) => <li>{text}</li>)}</ol>
                    </section>
                </div>
                <QuestionCreateForm onSubmit={this.handleCreateQuestion} />
            </LayoutWithHeader>
        );
    }
}
