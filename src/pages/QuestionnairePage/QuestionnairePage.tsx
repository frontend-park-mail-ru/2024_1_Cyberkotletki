import styles from './QuestionnairePage.module.scss';

import { QuestionnaireMarkButtons } from '@/components/QuestionnaireMarkButtons';
import { Button } from '@/components/Button';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export class QuestionnairePage extends AppComponent {
    render(): AppNode {
        return (
            <div className={cx('page')}>
                <p className={cx('question')}>
                    Насколько вы удовлетворены работой приложения?
                </p>
                <QuestionnaireMarkButtons />
                <Button
                    styleType="secondary"
                    outlined
                    className={cx('button')}
                    style="width:fit-content"
                >
                    Далее
                </Button>
            </div>
        );
    }
}
