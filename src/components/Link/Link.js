import { HistoryContext } from '../../Providers/HistoryProvider.js';
import { Core } from '../../core/Core.js';

export const Link = HistoryContext.Connect((props) =>
    Core.createElement('a', {
        ...props,
        'data-router-link': 'true',
        onClick: (e) => {
            e.preventDefault();

            if (window.location.pathname !== props.href) {
                const { changeRoute } = props.context;

                changeRoute(props.href);
            }
        },
    }),
);
