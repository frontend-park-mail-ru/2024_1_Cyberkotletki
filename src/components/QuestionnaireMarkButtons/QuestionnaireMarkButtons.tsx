import styles from './QuestionnaireMarkButtons.module.scss';

import { Button } from '@/components/Button';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';

const cx = concatClasses.bind(styles);

export interface QuestionnaireMarkButtonsProps {
    maxMark?: number;
}

export interface QuestionnaireMarkButtonsState {
    selectedMark?: number;
}

export class QuestionnaireMarkButtons extends AppComponent<
    QuestionnaireMarkButtonsProps,
    QuestionnaireMarkButtonsState
> {
    render(): AppNode {
        const { selectedMark = 1 } = this.state;
        const { maxMark = 10 } = this.props;

        return (
            <div className={cx('container')}>
                {Array.from({ length: maxMark }).map((_, index) => (
                    <Button
                        outlined={selectedMark !== index + 1}
                        styleType={
                            selectedMark === index + 1 ? 'primary' : 'secondary'
                        }
                        onClick={() => {
                            this.setState((prev) => ({
                                ...prev,
                                selectedMark: index + 1,
                            }));
                        }}
                        isIconOnly
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        );
    }
}
