import { Header } from '../../components/Header/Header.js';
import { Core } from '../../core/Core.js';

export const RootPage = (props) =>
    Core.createElement('div', {
        ...props,
        children: [Header({ title: 'Home Page' }), ...(props?.children ?? [])],
    });
