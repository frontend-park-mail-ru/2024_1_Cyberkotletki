import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';

export class QuestionCreateForm extends AppComponent {
    render(): AppNode {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    return false;
                }}
            >
                <Input
                    label="Вопрос"
                    id="question-name"
                    name="questionName"
                    // hasError={!!titleError}
                    // errorHint={titleError}
                    // onInput={this.handleInputTitle}
                    // onChange={this.handleChangeTitle}
                    placeholder="Введите вопрос"
                />
                <Button type="submit">Сохранить</Button>
            </form>
        );
    }
}
