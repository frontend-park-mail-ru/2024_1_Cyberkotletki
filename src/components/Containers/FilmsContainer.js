import { filmService } from '../../api/films/films.service.js';
import { Core } from '../../core/Core.js';
import { Component } from '../../core/src/Component.js';
import { OutlineButton } from '../Buttons/OutlineButton.js';
import { FilmCard } from '../Cards/FilmCard.js';

class FilmsContainerInner extends Component {
    state = {
        filmsIds: [],
    };

    fetchFilmsIdsByGenre = (genre) => {
        filmService.getFilmsIdsByGenre(genre).then((data) => {
            this.setState((prev) => ({
                ...prev,
                filmsIds: data.ids,
            }));
        });
    };

    componentDidMount() {
        this.fetchFilmsIdsByGenre('action');
    }

    render() {
        const buttonComedian = OutlineButton({
            children: ['Комедия'],
            onClick: () => this.fetchFilmsIdsByGenre('comedian'),
        });
        const buttonAction = OutlineButton({
            children: ['Боевик'],
            onClick: () => this.fetchFilmsIdsByGenre('action'),
        });
        const buttonDrama = OutlineButton({
            children: ['Драма'],
            onClick: () => this.fetchFilmsIdsByGenre('drama'),
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
                ...this.state.filmsIds.map((ID) =>
                    FilmCard({
                        id: ID,
                    }),
                ),
            ),
        );
    }
}

export const FilmsContainer = (props) => new FilmsContainerInner(props);
