import { HistoryContext } from '../../Providers/HistoryProvider.js';

const LinkInner = ({ getContext, context, ...props }, children) => {
    const a = document.createElement('a');

    a.addEventListener('click', (e) => {
        e.preventDefault();

        if (window.location.href !== e.target.href) {
            window.history.pushState(null, '', props.href);

            const { changeRoute } = getContext();

            changeRoute(props.href);
        }
    });

    Object.entries(props).forEach(([key, value]) => {
        a[key] = value;
    });

    a.innerText = children;
    a['data-router-link'] = 'true';
    // a.setAttribute('data-router-link', 'true');

    return a;
};

export const Link = HistoryContext.Connect(LinkInner);
