import styles from './PasswordInput.module.scss';

import { icEyeHideUrl, icEyeUrl } from '@/assets/icons';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import type { InputTypeProps } from '@/components/Input/Input';
import { AppComponent } from '@/core';
import { concatClasses, getPasswordComplexityMessage } from '@/utils';
import { PasswordComplexity, checkPassword } from '@/validators/validators';

const cx = concatClasses.bind(styles);

interface PasswordInputState {
    isUnlocked: boolean;
    complexity?: PasswordComplexity;
}

export interface PasswordInputProps extends InputTypeProps {
    withPasswordComplexity?: boolean;
}

export class PasswordInput extends AppComponent<
    PasswordInputProps,
    PasswordInputState
> {
    state: PasswordInputState = { isUnlocked: false };

    handleToggleLocked = () => {
        this.setState(({ isUnlocked, ...prev }) => ({
            ...prev,
            isUnlocked: !isUnlocked,
        }));
    };

    handleInput = (event: App.FormEvent<HTMLInputElement>) => {
        const { onInput, withPasswordComplexity } = this.props;

        if (withPasswordComplexity) {
            const complexity = checkPassword(event.currentTarget.value);

            if (complexity !== this.state.complexity) {
                this.setState((prev) => ({ ...prev, complexity }));
            }
        }

        onInput?.(event);
    };

    render() {
        const { withPasswordComplexity, ...props } = this.props;
        const { isUnlocked, complexity } = this.state;

        return (
            <Input
                {...props}
                type={isUnlocked ? 'text' : 'password'}
                iconContainerClassName={cx('icon-container')}
                iconPos="end"
                icon={
                    <Button
                        isIconOnly
                        outlined
                        styleType="secondary"
                        onClick={this.handleToggleLocked}
                        role="switch"
                        aria-checked={isUnlocked}
                        aria-label="Switch show password"
                        title={isUnlocked ? 'Скрыть пароль' : 'Показать пароль'}
                    >
                        <Icon
                            icon={isUnlocked ? icEyeHideUrl : icEyeUrl}
                            className={cx('icon', { unlocked: isUnlocked })}
                        />
                    </Button>
                }
                onInput={this.handleInput}
            >
                {withPasswordComplexity && complexity && (
                    <div
                        className={cx('complexity', {
                            bad: complexity === PasswordComplexity.BAD,
                            medium: complexity === PasswordComplexity.MEDIUM,
                            good: complexity === PasswordComplexity.GOOD,
                        })}
                    >
                        {getPasswordComplexityMessage(complexity)}
                    </div>
                )}
            </Input>
        );
    }
}
