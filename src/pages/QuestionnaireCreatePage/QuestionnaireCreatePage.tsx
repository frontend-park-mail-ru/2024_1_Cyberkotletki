import { Button } from '@/components/Button';
import { QuestionCreateForm } from '@/components/QuestionCreateForm';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { LayoutWithHeader } from '@/layouts/LayoutWithHeader';

const QUESTIONS = [
    { id: 0, text: 'Насколько вы удовлетворены работой приложения?' },
    { id: 1, text: 'Какова вероятность того, что вы посоветуете сервис?' },
];

export class QuestionnaireCreatePage extends AppComponent {
    render(): AppNode {
        return (
            <LayoutWithHeader>
                <div>
                    <section>
                        <h1>Вопросы</h1>
                        <ol>
                            {QUESTIONS.map((question) => (
                                <li>{question.text}</li>
                            ))}
                        </ol>
                    </section>
                    <Button
                        outlined
                        styleType="secondary"
                        // style="width: fit-content"
                    >
                        Добавить вопрос
                    </Button>
                </div>
                <QuestionCreateForm />
            </LayoutWithHeader>
        );
    }
}
