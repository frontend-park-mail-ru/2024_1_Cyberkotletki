import { Header } from '../../components/Header/Header.js';

export const RootPage = () => {
    const div = document.createElement('div');
    div.append(Header({ props: { title: 'Home Page' } }));

    return div;
};
