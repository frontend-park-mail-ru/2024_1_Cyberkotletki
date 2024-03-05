import { Header } from '../../components/Header/Header.js';
import { Core } from '../../core/Core.js';

import styles from './RootPage.module.scss';

export const RootPage = (props) =>
    Core.createElement('div', {
        ...props,
        class: styles['root-page'],
        children: [Header({ title: 'Home Page' }), ...(props?.children ?? [])],
    });
