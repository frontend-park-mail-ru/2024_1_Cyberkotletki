import styles from './FactsAccordion.module.scss';

import { Button } from '@/components/Button';
import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import type { OmitChildren } from '@/types/OmitChildren.types';
import { concatClasses } from '@/utils';
import { Icon } from '@/components/Icon';
import { icArrowDownUrl } from '@/assets/icons';

const cx = concatClasses.bind(styles);

export interface FactsAccordionProps
    extends OmitChildren<
        App.DetailedHTMLProps<
            App.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >
    > {
    facts?: string[];
}

interface FactsAccordionState {
    expanded?: boolean;
}

export class FactsAccordion extends AppComponent<
    FactsAccordionProps,
    FactsAccordionState
> {
    toggleExpand = () => {
        this.setState((prev) => ({ ...prev, expanded: !prev.expanded }));
    };

    render(): AppNode {
        const { facts, className, ...props } = this.props;
        const { expanded } = this.state;

        const firstFacts = facts?.slice(0, 3);
        const nestedFacts = facts?.slice(3);

        return (
            <div className={cx('facts-accordion', className)} {...props}>
                <ul className={cx('list', 'first')}>
                    {firstFacts?.map((fact) => (
                        <li className={cx('fact-item')}>{fact}</li>
                    ))}
                </ul>
                {!!nestedFacts?.length && (
                    <div className={cx('nested-facts', { opened: expanded })}>
                        <ul className={cx('nested-facts-inner', 'list')}>
                            {nestedFacts?.map((fact) => (
                                <li className={cx('fact-item')}>{fact}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {!!nestedFacts?.length && (
                    <Button
                        onClick={this.toggleExpand}
                        styleType="secondary"
                        outlined
                        className={cx('expand-button')}
                    >
                        <Icon
                            icon={icArrowDownUrl}
                            className={cx('arrow-icon', { rotate: expanded })}
                        />
                        {expanded ? 'Скрыть' : 'Показать еще'}
                    </Button>
                )}
            </div>
        );
    }
}
