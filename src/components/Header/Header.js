import { createElement } from '../../core/createElement.js';
import { Link } from '../Link/Link.js';

export const Header = ({ props: { title } }) => {
    // const header = document.createElement('header');
    // const nav = document.createElement('nav');
    // const ul = document.createElement('ul');
    // const homeLi = document.createElement('li');
    // const loginLi = document.createElement('li');
    // const homeLink = Link({ href: '/' }, 'Home');
    // homeLi.append(homeLink);
    // const loginLink = Link({ href: '/login' }, 'Login');
    // loginLi.append(loginLink);

    // ul.append(homeLi, loginLi);
    // nav.append(ul);

    const head = document.createElement('h1');
    head.innerText = title;

    // header.append(head);
    // header.append(nav);

    return createElement(
        'header',
        {},
        head,
        createElement(
            'nav',
            {},
            createElement(
                'ul',
                {},
                createElement('li', {}, Link({ href: '/' }, 'Home')),
                createElement('li', {}, Link({ href: '/login' }, 'Login')),
            ),
        ),
    );
};
