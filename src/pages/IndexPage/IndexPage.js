import { Core } from '../../core/Core.js';
import { Header } from '../../components/Header/NewHeader.js';
import { FilmsContainer } from '../../components/Containers/FilmsContainer.js';

export const IndexPage = (props) =>
    Core.createElement('div', {
        class: 'index-page',
        ...props,
        children: [Header(), FilmsContainer(), ...(props?.children ?? [])],
    });
