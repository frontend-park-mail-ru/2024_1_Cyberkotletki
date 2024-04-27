import styles from './LayoutQuestionnaire.module.scss';
import { AsideIframe } from './AsideIframe';

import { AppComponent } from '@/core';
import type { AppNode } from '@/core/shared/AppNode.types';
import { concatClasses } from '@/utils';
import { ProfileContext } from '@/Providers/ProfileProvider';
import type { AppContext } from '@/types/Context.types';

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
}

class LayoutQuestionnaireInner extends AppComponent<
    LayoutQuestionnaireProps,
    LayoutQuestionnaireState
> {
    render(): AppNode {
        const { className, children, context, ...props } = this.props;
        const { isLoggedIn: stateIsLoggedIn } = this.state;

        const isLoggedIn = !!context?.profile?.profile || stateIsLoggedIn;

        if (!context?.profile?.profile || this.state.isLoggedIn === undefined) {
            void context?.profile?.getProfile().then((profile) => {
                this.setState((prev) => ({ ...prev, isLoggedIn: !!profile }));
            });
        }

        return (
            <div className={cx('container', className)} {...props}>
                {children}
                {isLoggedIn && <AsideIframe />}
            </div>
        );
    }
}

export const LayoutQuestionnaire = ProfileContext.Connect(
    LayoutQuestionnaireInner,
);
