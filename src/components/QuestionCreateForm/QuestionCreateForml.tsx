import styles from './QuestionCreateForm.module.scss';

import type { PollQuestionBody } from '@/api/question/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface QuestionCreateFormProps {
    onSubmit?: (data: PollQuestionBody) => void;
}

export interface QuestionCreateFormState {
    error?: string;
}

export class QuestionCreateForm extends AppComponent<
    QuestionCreateFormProps,
    QuestionCreateFormState
> {
    handleTextInput = (e: App.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value) {
            this.setState((prev) => ({ ...prev, error: '' }));
        }
    };

    handleTextChange = (e: App.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value.trim()) {
            this.setState((prev) => ({ ...prev, error: 'Введите вопрос' }));
        }
    };

    render(): AppNode {
        const { error } = this.state;

        return (
            <form
                className={cx('form')}
                onSubmit={(e) => {
                    e.preventDefault();

                    const formData = new FormData(e.currentTarget);

                    const body = Object.fromEntries(
                        formData,
                    ) as unknown as PollQuestionBody;

                    if (!body.text?.trim()) {
                        this.setState((prev) => ({
                            ...prev,
                            error: 'Введите вопрос',
                        }));

                        return;
                    }

                    this.props.onSubmit?.(body);

                    return false;
                }}
            >
                <Input
                    label="Вопрос"
                    id="question-name"
                    name="text"
                    hasError={!!error}
                    errorHint={error}
                    onInput={this.handleTextInput}
                    onChange={this.handleTextChange}
                    placeholder="Введите вопрос"
                />
                <Button
                    type="submit"
                    className={cx('add-button')}
                    disabled={!!error}
                >
                    Добавить вопрос
                </Button>
            </form>
        );
    }
}
