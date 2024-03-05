import { Core } from '../../core/Core.js';
import { Component } from '../../core/src/Component.js';
import { OutlineButton } from '../Buttons/OutlineButton.js';
import { FilmCard } from '../Cards/FilmCard.js';

class FilmsContainerInner extends Component {
    state = {
        filmsIds: [],
    };

    fetchFilmsIdsByGenre = (genre) => {
        fetch(`http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/collections/compilation/${genre}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState((prev) => ({
                    ...prev,
                    filmsIds: data.ids,
                }));
            });
    };

    componentDidMount() {
        this.fetchFilmsIdsByGenre('action');
    }

    render(props, state) {
        const buttonComedian = OutlineButton({
            buttonText: 'Комедия',
            click: () => this.fetchFilmsIdsByGenre('comedian'),
        });
        const buttonAction = OutlineButton({
            buttonText: 'Боевик',
            click: () => this.fetchFilmsIdsByGenre('action'),
        });
        const buttonDrama = OutlineButton({
            buttonText: 'Драма',
            click: () => this.fetchFilmsIdsByGenre('drama'),
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
