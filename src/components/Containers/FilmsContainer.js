import { Core } from '../../core/Core.js';
import { Component } from '../../core/src/Component.js';
import { OutlineButton } from '../Buttons/OutlineButton.js';
import { FilmCard } from '../Cards/FilmCard.js';
import { collectionsService } from '../../api/collections/service';

class FilmsContainerInner extends Component {
    state = {
        filmsIds: [],
    };

    getFilmsIdsByGenre = (genre) => {
        collectionsService.getCompilation(genre).then((data) => {
            this.setState((prev) => ({
                ...prev,
                filmsIds: data.ids,
            }));
        });
    };

    componentDidMount() {
        this.getFilmsIdsByGenre('action');
    }

    render() {
        const buttonComedian = OutlineButton({
            children: ['Комедия'],
            onClick: () => this.getFilmsIdsByGenre('comedian'),
        });
        const buttonAction = OutlineButton({
            children: ['Боевик'],
            onClick: () => this.getFilmsIdsByGenre('action'),
        });
        const buttonDrama = OutlineButton({
            children: ['Драма'],
            onClick: () => this.getFilmsIdsByGenre('drama'),
        });

        return Core.createElement(
            'div',
            { class: 'container' },
            Core.createElement(
                'h4',
                { style: 'margin-top: 48px;' },
                'Специально для вас',
            ),
            Core.createElement(
                'div',
                { class: 'categories' },
                buttonComedian,
                buttonAction,
                buttonDrama,
            ),
            Core.createElement(
                'div',
                { class: 'grid-container' },
                // для каждого айди фильма генерируем карточку фильма
                ...this.state.filmsIds.map((id) =>
                    FilmCard({
                        id,
                    }),
                ),
            ),
        );
    }
}

export const FilmsContainer = (props) => new FilmsContainerInner(props);
